import { Component, OnInit ,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddComponent } from './emp-add/emp-add.component';
import { EmployeService } from './services/employe.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

displayedColumns: string[] = ['id', 
'firstName',
 'lastName',
  'email',
  'dob',
  'gender',
'education',
'company',
'experience',
'package',
'action',];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private _dialog: MatDialog, 
    private _empService: EmployeService,
    private snackbar:MatSnackBar
   ) {}

  ngOnInit(): void {
    this.getEmployeList();
  }

  OpenAddempform()  {
    const dialogRef=this._dialog.open (EmpAddComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getEmployeList();
        }
      },
    });
  }
  getEmployeList(){
    this._empService.getEmployeList().subscribe({
      next:(res) => {
       this.dataSource = new MatTableDataSource(res);
       this.dataSource.sort = this.sort ;
       this.dataSource.paginator = this.paginator;
},

      error:console.log,
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmploye(id:number){
    this._empService.deleteEmploye(id).subscribe({
      next: (res) => {
        this.snackbar.open("Deleted","Dismiss" ,{
           verticalPosition: 'top',
        }) 
        this.getEmployeList();
      },
      error: console.log,
    })
  }

  OpenEditform(data:any)  {
    const dialogRef= this._dialog.open (EmpAddComponent,{
    data:data
   });
   dialogRef.afterClosed().subscribe({
    next: (val) => {
      if(val){
        this.getEmployeList();
      }
    },
  });
  }

}
