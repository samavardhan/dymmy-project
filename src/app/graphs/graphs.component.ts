import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { BaseDetails } from '../services/data.model';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {

  public data: any;
  public enviData: any;
  public proxy: any;
  public sharedflow: any;
  public service: any;
  public dev: any;
  public IT: any;
  public uat: any;
  public prod: any;
  options: any;
  newdate: any;
 

model: BaseDetails;
constructor(private dataservice: DataService) {
  this.model = JSON.parse(sessionStorage.getItem("model"));
}

ngOnInit() {
  this.getcount();
  if (this.model.environment.length != 0) {
    this.getCountEnvironment();
  }
  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  var dateObj = new Date();
  var numbermonth = dateObj.getUTCMonth() ; //months from 1-12
  var year = dateObj.getUTCFullYear();
  this.newdate = month[numbermonth] + ' ' + year;
}

getcount() {
  let body = {
    "start": this.model.date1,
    "end": this.model.date2
  }
  this.dataservice.getCountType(body).subscribe((resp) => {
    let res = JSON.parse(JSON.stringify(resp));

    res.applicationTypeResponses.forEach((item)=>{
      if(item.applicationType == 'proxy'){
        this.proxy = item.count
      }
      if(item.applicationType == 'sharedflow'){
        this.sharedflow = item.count
      }
      if(item.applicationType == 'service'){
        this.service = item.count
      }
    })
    // this.sharedflow = res.sharedflow
    // this.service = res.service
    this.DatabindingForApplicationType();

    //printing values
    // console.log(Number(this.proxy), Number(this.sharedflow), Number(this.service))
  })
}

DatabindingForApplicationType() {
  this.data = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [

        ],
        hoverBackgroundColor: [

        ]
      }]
  };


  if (this.model.proxy == true) {
    this.data.labels.push('proxy');
    this.data.datasets[0].data.push(Number(this.proxy));
    this.data.datasets[0].backgroundColor.push("#591ec8");
    this.data.datasets[0].hoverBackgroundColor.push("#591ec8")
  }
  if (this.model.sharedflow == true) {
    this.data.labels.push('sharedflow');
    this.data.datasets[0].data.push(Number(this.sharedflow));
    this.data.datasets[0].backgroundColor.push("#36A2EB");
    this.data.datasets[0].hoverBackgroundColor.push("#36A2EB");
  }
  if (this.model.service == true) {
    this.data.labels.push('service');
    this.data.datasets[0].data.push(Number(this.service));
    this.data.datasets[0].backgroundColor.push("#29d9e3");
    this.data.datasets[0].hoverBackgroundColor.push("#29d9e3");
  }




  this.options = {
    events: false,
    animation: {
      duration: 500,
      easing: "easeOutQuart",
      onComplete: function () {
        var ctx = this.chart.ctx;
        //ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';

        this.data.datasets.forEach(function (dataset) {

          for (var i = 0; i < dataset.data.length; i++) {
            var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
              total = dataset._meta[Object.keys(dataset._meta)[0]].total,
              mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius) / 2,
              start_angle = model.startAngle,
              end_angle = model.endAngle,
              mid_angle = start_angle + (end_angle - start_angle) / 2;

            var x = mid_radius * Math.cos(mid_angle);
            var y = mid_radius * Math.sin(mid_angle);

            ctx.fillStyle = '#000000';
            if (i == 3) { // Darker text color for lighter background
              ctx.fillStyle = '#000000';
            }

            var val = dataset.data[i];
            var percent = String(Math.round(val / total * 100)) + "%";

            if (val != 0) {
              ctx.fillText(dataset.data[i] + '(' + (percent) + ')', model.x + x, model.y + y);
              // Display percent in another line, line break doesn't work for fillText
              ctx.fillText(model.label, model.x + x, model.y + y + 15);
            }
          }
        });
      }
    }
  };

}

getCountEnvironment() {
  let body = {
    "start": this.model.date1,
    "end": this.model.date2
  }
  this.dataservice.getCountEnvironment(body).subscribe((resp) => {
    let res = JSON.parse(JSON.stringify(resp));

    res.environmentResponses.forEach((item)=>{
      if(item.environment == 'dev'){
        this.dev = item.count
      }
      if(item.environment == 'it'){
        this.IT = item.count
      }
      if(item.environment == 'uat'){
        this.uat = item.count
      }
      if(item.environment == 'prod'){
        this.prod = item.count
      }
    })
    // this.dev = res.proxy
    // this.IT = res.sharedflow
    // this.uat = res.service
    // this.prod = res.prod
    this.DatabindingForEnvironment();

    //data print
    // console.log(Number(this.proxy), Number(this.sharedflow), Number(this.service))
  })
}

DatabindingForEnvironment() {
  this.enviData = {
    labels: ['dev', 'IT', 'uat', 'prod'],
    datasets: [
      {
        data: [Number(this.proxy), Number(this.sharedflow), Number(this.service), Number(this.prod)],
        backgroundColor: [
          "#591ec8",
          "#36A2EB",
          "#29d9e3",
          "#2a9384"
        ],
        hoverBackgroundColor: [
          "#591ec8",
          "#36A2EB",
          "#29d9e3",
          "#2a9384"
        ]
      }]
  };

  this.options = {
    events: false,
    animation: {
      duration: 500,
      easing: "easeOutQuart",
      onComplete: function () {
        var ctx = this.chart.ctx;
        //ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';

        this.data.datasets.forEach(function (dataset) {

          for (var i = 0; i < dataset.data.length; i++) {
            var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
              total = dataset._meta[Object.keys(dataset._meta)[0]].total,
              mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius) / 2,
              start_angle = model.startAngle,
              end_angle = model.endAngle,
              mid_angle = start_angle + (end_angle - start_angle) / 2;

            var x = mid_radius * Math.cos(mid_angle);
            var y = mid_radius * Math.sin(mid_angle);

            ctx.fillStyle = '#000000';
            if (i == 3) { // Darker text color for lighter background
              ctx.fillStyle = '#000000';
            }

            var val = dataset.data[i];
            var percent = String(Math.round(val / total * 100)) + "%";

            if (val != 0) {
              ctx.fillText(dataset.data[i] + '(' + (percent) + ')', model.x + x, model.y + y);
              // Display percent in another line, line break doesn't work for fillText
              ctx.fillText(model.label, model.x + x, model.y + y + 15);
            }
          }
        });
      }
    }
  };
}


}
