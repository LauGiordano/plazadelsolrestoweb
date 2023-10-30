import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DishForm {
  dishId: string,
  description: string,
  name: string,
  imgURL: string,
  price: number
}

export interface DishFormData {
  data: DishForm,
  callback: any
}

@Component({
  selector: 'app-dish-form-modal',
  templateUrl: './dish-form-modal.component.html',
  styleUrls: ['./dish-form-modal.component.css']
})

export class DishFormModalComponent implements OnInit {
  public dishForm: FormGroup | undefined;

  constructor(
    public dialogRef: MatDialogRef<DishFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dataModel: DishFormData
  ) {}
  
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.dishForm = new FormGroup({
      dishId: new FormControl(!!this.dataModel && !!this.dataModel.data ? this.dataModel.data.dishId : null),
      description: new FormControl(!!this.dataModel && !!this.dataModel.data ? this.dataModel.data.description : null),
      name: new FormControl(!!this.dataModel && !!this.dataModel.data ? this.dataModel.data.name : null),
      imgURL: new FormControl(!!this.dataModel && !!this.dataModel.data ? this.dataModel.data.imgURL : null),
      price: new FormControl(!!this.dataModel && !!this.dataModel.data ? this.dataModel.data.price : null),
    })
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (!!this.dishForm){
      this.dishForm.markAllAsTouched();
      if (!!this.dishForm.valid) {
        this.dataModel.callback(this.dishForm.value)
        .then((res: any) => {
          switch(res.type) {
            case 'sucess':
              this.dialogRef.close(res);
              break;
            case 'error':
              break;
            default:
              break;
          }
        });
      }
    }
  }
}
