import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeService } from '../services/employe.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-emp-add',
  templateUrl: './emp-add.component.html',
  styleUrls: ['./emp-add.component.css']
})
export class EmpAddComponent  implements OnInit{
empform: FormGroup;


  education: string[] =[
    'Matric',
    'Diploma',
    'Graduate',
    'Post-Graduate'
  ];
  snackbar: any;


  constructor (private _fb:FormBuilder, private _empService: EmployeService,
    private _dialogRef:MatDialogRef<EmpAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private MatSnackBar:MatSnackBar,
    ){
    this.empform = this._fb.group({
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      package:'',
    });
  }
 
ngOnInit(): void {
  this.empform.patchValue(this.data);
}

  onFormSubmit() {
    if (this.empform.valid) {
      if(this.data){
        this._empService.updateEmploye(this.data.id, this.empform.value).subscribe({
          next:(val: any) => {
            this.MatSnackBar.open("Details Updated SucessFully","Done",{
           verticalPosition: 'top',
            })
            this._dialogRef.close(true);
          },
          error:(err:any) => {
            console.error(err);
          },
        });

    }else { this._empService.addEmploye(this.empform.value).subscribe({
      next:(val: any) => {
        this.MatSnackBar.open("New Employe Added SucessFully","Done" ,{
     verticalPosition: 'top',
   })
        this._dialogRef.close(true);
      },
      error:(err:any) => {

        console.error(err);
      },
    });
      }
    }
  }
}
