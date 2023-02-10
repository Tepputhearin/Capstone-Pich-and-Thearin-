import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  
  pillForm!: FormGroup;
  actionBtn :string="Save";
  constructor(private formBuilder : FormBuilder, 
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
     private dialogRef: MatDialogRef<DialogComponent>
     ){
    

  }
  
  
  ngOnInit(): void {
    this.pillForm = this.formBuilder.group({
      pillCode : ['',Validators.required],
      pillName : ['', Validators.required],
      pillQuan : ['', Validators.required],
      pillPrice : ['',Validators.required],
      pillPur : ['',Validators.required],
      pillEx : ['',Validators.required]
    });
    if(this.editData){
      this.actionBtn = "Update";
      this.pillForm.controls['pillCode'].setValue(this.editData.pillCode);
      this.pillForm.controls['pillName'].setValue(this.editData.pillName);
      this.pillForm.controls['pillQuan'].setValue(this.editData.pillQuan);
      this.pillForm.controls['pillPrice'].setValue(this.editData.pillPrice);
      this.pillForm.controls['pillPur'].setValue(this.editData.pillPur);
      this.pillForm.controls['pillEx'].setValue(this.editData.pillEx);
    }
  }
  addPill(){
    if(!this.editData){
      if(this.pillForm.valid){
        this.api.postPill(this.pillForm.value)
        .subscribe({
          next:(res)=>{
            alert("Pill info has been added successfully")
            this.pillForm.reset();
            this.dialogRef.close('Save');
          },
          error:()=>{
            alert("Error while adding the product")
          }
        })
      }
    } else{
      this.updatePill()
    }
  }
  updatePill(){
    this.api.putPill(this.pillForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Pill has been updated successfully");
        this.pillForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the record");
      }
    })
  }
}
