import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseDetails, SecondForm } from '../services/data.model';
import { NgForm, FormGroup, FormControl, FormArray } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {
  public showForMetrics: boolean = false;
  model: BaseDetails;
  showSecondForm: boolean;
  ToRunProjectRequired: boolean = true;
  ToValidateDeplymentCheckbox: boolean = true;

  constructor(private router: Router, private dataService: DataService) {
    this.model = new BaseDetails();
    this.model.secondForm = new SecondForm();
  }

  ngOnInit() {
    this.model.secondForm.language = '';
    this.model.secondForm.jenkinsExp = '';
  }
  navigateToGraph() {
    if (this.model.environmentBased == 'Yes') {
      this.model.environment = ['dev', 'it', 'uat', 'prod'];
    }
    else {
      this.model.environment = [];
    }

    if (this.model.proxy == true) {
      this.model.applicationType.push('proxy');
    }
    if (this.model.sharedflow == true) {
      this.model.applicationType.push('sharedflow');
    }
    if (this.model.service == true) {
      this.model.applicationType.push('service');
    }

    sessionStorage.setItem("model", JSON.stringify(this.model));
    this.router.navigate(['/graphs']);
  }

  addToEnv(value) {

    if (value == 'windows' && this.model.windows) {
      this.model.secondForm.winLinEnv.push('windows');
    }
    else if (value == 'linux' && this.model.linux) {
      this.model.secondForm.winLinEnv.push('linux');
    }
    else {
      this.model.secondForm.winLinEnv.forEach((item, index) => {
        if (item == value) {
          this.model.secondForm.winLinEnv.splice(index, 1);
        }
      })
    }

    this.ToRunProjectCHeck();
  }

  ToRunProjectCHeck() {
    if (this.model.secondForm.winLinEnv.length == 0) {
      this.ToRunProjectRequired = true;
    }
    else {
      this.ToRunProjectRequired = false;
    }
  }


  deploymentLocation(value) {
    if (value == 'windows' && this.model.winServer) {
      this.model.secondForm.serverName.push('windows');
    }
    else if (value == 'linux' && this.model.linuxServer) {
      this.model.secondForm.serverName.push('linux');
    }
    else if (value == 'k8' && this.model.k8server) {
      this.model.secondForm.serverName.push('k8');
    }
    else {
      this.model.secondForm.serverName.forEach((item, index) => {
        if (item == value) {
          this.model.secondForm.serverName.splice(index, 1);
        }
      })
    }

    this.validateDeploymentRunning();
  }

  validateDeploymentRunning() {
    if (this.model.secondForm.serverName.length == 0) {
      this.ToValidateDeplymentCheckbox = true;
    }
    else {
      this.ToValidateDeplymentCheckbox = false;
    }
  }

  submitSecondForm(group) {
    if (!group.valid) {
      this.validateAllFormFields(group.form);
    }
    else {
      this.SubmitEnrollmentForm();
    }
  }

  SubmitEnrollmentForm() {
    let body = this.model.secondForm;
    console.log(this.model.secondForm);
    this.dataService.sendFormData(body).subscribe((res) => {
      console.log(res);
    })
  }
  validateAllFormFields(formGroup: any) {
    // This code also works in IE 11
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        this.validateAllFormFields(control);
      }
    });
  }
  navigateToMetrics() {
    this.showForMetrics = true;
    this.showSecondForm = false;
  }

  showDetailsform() {
    this.showSecondForm = true;
    this.showForMetrics = false;
  }
}
