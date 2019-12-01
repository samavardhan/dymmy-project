export class BaseDetails{
    public date1: Date;
    public date2: Date;
    public proxy: any;
    public sharedflow: any;
    public service: any;
    public environmentBased:any;
    public environment: string[];
    public applicationType: string[]=[];

    windows : boolean;
    linux : boolean;

    winServer : boolean;
    linuxServer : boolean;
    k8server : boolean;

    secondForm : SecondForm;


}
export class SecondForm{
    organizationName:string;
    applicationName : string;
    languageVersion : string;
    languageVersions : string;
    emailId : string;
    carId : string;
    costCenter : string[]=[];
    healthCheckPath : Date;
    k8NameSpace : string[]=[];
    kubernateesDomainName : string;
    kubernateesClusterName : string;
    kubernateesProjectName : string;

    jenkinsPipeline : string;
    languagess : string;
    jenkinsExp : string;
}
