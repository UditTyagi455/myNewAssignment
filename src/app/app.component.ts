import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MyserviceService } from './services/myservice.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'newproject';
  updateArray:any = [];
  id:number = 0 ;
  imageSrc: string = "";
  date: any = new Date().getTime();
  apiAllData: any = [];
  base64textString: any = [];

  constructor(private myform: FormBuilder, private apiData: MyserviceService) { }

  submitForm = this.myform.group({
    id: [this.date],
    name: [],
    email: [],
    age: [],
    joiningdatetime: [],
    img: [{}],
  })


  ngOnInit(): void {
    this.id = 0;
    this.apiData.getApiData().subscribe(
      data => {
        this.apiAllData = data;
      }
    )
  }

  onFileChange(event: any) {

    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {

      const [file] = event.target.files;

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;

        this.submitForm.patchValue({
          img: reader.result
        });
      };
    }

  }

  onDelete(data: any) {
    this.apiData.deleteApiData(data.id).subscribe(data => {
       alert("one item deleted")
       this.ngOnInit();
      });
  }

  onUpdate(data:any) {
    const MyData = this.apiAllData.find( (ids:any) => ids.id === data.id);
    this.submitForm.setValue(MyData)
    this.id = 1;
    this.updateArray = MyData ;
  }

  OnSubmit() {
  if(this.id === 0) {
    this.apiData.postApiData(this.submitForm.value).subscribe(data => {
      alert("data posted")
      this.ngOnInit();
    });
    this.submitForm.reset();
  } else if (this.id === 1) {
      this.apiData.updateApiData(this.submitForm.value,this.updateArray.id).subscribe(data => {
         alert("data updated");
         this.ngOnInit();
      }   
         );
      this.submitForm.reset();
  }
  }
}
