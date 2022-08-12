<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use SchoolManagement\Models\StudentModel;

class StudentDetailsController extends Controller
{

//Document Upload
    public function addDocumentDetails(Request $request)
    {

        $Id=$request['Id'];
        $StudentId=$request['StudentId'];
        $DocumentTypeId=$request['DocumentTypeId'];
        $DocumentLocation=$request['DocumentLocation'];
        $DocumentName=$request['DocumentName'];
        $DocumentFullPath=$request['DocumentFullPath'];
    
        $listdata = DB::select('call student_managestudent_sp_documentinsertupdate(?,?,?,?,?,?)',
        [$Id,$StudentId,$DocumentTypeId,$DocumentLocation,$DocumentName,$DocumentFullPath]); 
        return $listdata;

    }

    public function getDocumentDetails(Request $request)
    {
        $Id = $request['StudentId'];
        $ViewData =
        DB::table('studentdocumentdetails')
        ->leftjoin('documenttypemaster as dm', 'studentdocumentdetails.documenttypeid', '=', 'dm.id')    
         ->select('studentdocumentdetails.id','studentdocumentdetails.studentid','studentdocumentdetails.documenttypeid','studentdocumentdetails.documentlocation','studentdocumentdetails.documentname','studentdocumentdetails.documentfullpath','dm.document')
        ->where('studentdocumentdetails.studentid',$Id)
        ->get();
        return $ViewData;
     

    }

    public function DocumentDetails_EditList(Request $request)
    {
        $StudentId = $request['StudentId'];
        $EditData = DB::select('call student_document_editlist(?)',
        [$StudentId]); 
        return $EditData;
    }

    public function uploadDocument(Request $request)
    {
       
        if($request->hasFile('file1'))
        {
            $imageFileType = strtolower(pathinfo($request->file('file1'),PATHINFO_EXTENSION));
            //dd($imageFileType);
            $storagePath  = public_path('Uploads\\');
            $filename = $request->file('file1') ->store('/Images');        
            //To split filename and file directory
           
            $var = preg_split("#/#", $filename); 
            $filenameExt = $var[1];
            $filedata = ['DirectoryPath'=>$storagePath,
             //'Filepath'=>$var[1]."/".$var[2],
             'Filepath'=>"Images/".$var[1],
            'Filename'=>$filenameExt
        ];
        return $filedata;
        }
         
        return 0;
    }  
    public function deleteDocument(Request $request)
    {
        $Id = $request['Id'];
        $delete = DB::table('studentdocumentdetails')->where('id', $Id)->delete();
        if($delete == true)
        {
            return 1;
        }
        else
        {
           return 0;
        }
    }

//Photo Upload
public function upload(Request $request)
{
   
    if($request->hasFile('file'))
    {
        $imageFileType = strtolower(pathinfo($request->file('file'),PATHINFO_EXTENSION));
        //dd($imageFileType);
        $storagePath  = public_path('Uploads\\');
        $filename = $request->file('file') ->store('/Images');        
        //To split filename and file directory
       
        $var = preg_split("#/#", $filename); 
        $filenameExt = $var[1];
        $filedata = ['DirectoryPath'=>$storagePath,
         //'Filepath'=>$var[1]."/".$var[2],
         'Filepath'=>"Images/".$var[1],
        'Filename'=>$filenameExt
    ];
    return $filedata;
    }
     
    return 0;
    }   
    public function list(Request $request)
    {
        $Id = $request['Id']!== 0 ? $request['Id'] : 0;
        $mediumid = $request['MediumId']!== 0 ? $request['MediumId'] : 0;
        $courseid = $request['CourseId']!== 0 ? $request['CourseId'] : 0;
        $SectionId = $request['SectionId']!== 0 ? $request['SectionId'] : 0;
        // $sname = $request['StudentName']!== null ? $request['StudentName'] : "";
        $AcademicYearId = $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;
        $RollNumber = $request['RollNumber']!== null ? $request['RollNumber'] : "";
        $InstitutionId = $request['InstitutionId']!== 0 ? $request['InstitutionId'] : 0;

        $listdata = DB::select('call managestudentslist(?,?,?,?,?,?,?,?)',[$Id,$AcademicYearId,$RollNumber,$courseid,$SectionId,$mediumid,$InstitutionId,session('UserId')]); 
        return $listdata;
    }
    public function listStudent(Request $request)
    {
        $id = $request['Id'];
        $ListData =
        DB::table('studentdetailsmaster')
        ->leftjoin('gendermaster as gm', 'studentdetailsmaster.genderid', '=', 'gm.id')
        ->leftjoin('religionmaster as rm', 'studentdetailsmaster.religionid', '=', 'rm.id')
        ->leftjoin('castemaster as ca', 'studentdetailsmaster.casteid', '=', 'ca.id')
        ->leftjoin('communitymaster as cm', 'studentdetailsmaster.communityid', '=', 'cm.id')
        ->leftjoin('mothertonguemaster as mt', 'studentdetailsmaster.mothertongueid', '=', 'mt.id')
        ->leftjoin('bloodgroupmaster as bg', 'studentdetailsmaster.bloodgroupid', '=', 'bg.id')
        ->leftjoin('academicyearmaster as ym', 'studentdetailsmaster.academicyearid', '=', 'ym.id')
        ->leftjoin('mediummasters as mm', 'studentdetailsmaster.mediumid', '=', 'mm.id')
       
        ->leftjoin('statemaster as st', 'studentdetailsmaster.stateid', '=', 'st.id')
        ->leftjoin('countrymaster as cy', 'studentdetailsmaster.countryid', '=', 'cy.id')
        ->leftjoin('locationmaster as lm', 'studentdetailsmaster.locationid', '=', 'lm.id')
        ->leftjoin('bankmaster as bm', 'studentdetailsmaster.banknameid', '=', 'bm.id')
        ->leftjoin('branchmaster as br', 'studentdetailsmaster.branchnameid', '=', 'br.id')
        ->leftjoin('referencetypemaster as r', 'studentdetailsmaster.referencetypeid', '=', 'r.id')    
        ->leftjoin('documenttypemaster as dm', 'studentdetailsmaster.documentid', '=', 'dm.id') 
        ->leftjoin('mediummasters as mmm', 'studentdetailsmaster.mediumpreviousid', '=', 'mmm.id') 
        ->leftjoin('coursemaster as cc', 'studentdetailsmaster.coursepreviousid', '=', 'cc.id') 
        ->leftjoin('academicyearmaster as y', 'studentdetailsmaster.yearid', '=', 'y.id') 
        ->leftjoin('qualificationmaster as qm', 'studentdetailsmaster.father_qualificationid', '=', 'qm.id') 
        ->leftjoin('qualificationmaster as qmm', 'studentdetailsmaster.mother_qualificationid', '=', 'qmm.id')
        ->leftjoin('qualificationmaster as q', 'studentdetailsmaster.guardian_qualificationid', '=', 'q.id')
      
        ->leftjoin('academicyearmaster as aym', 'studentdetailsmaster.yearid', '=', 'aym.id')

        ->leftjoin('coursemaster as cmmm', 'studentdetailsmaster.courseid', '=', 'cmmm.id')
        ->leftjoin('sectionmaster as se', 'studentdetailsmaster.sectionid', '=', 'se.id')
        ->leftjoin('manageemployee as me','studentdetailsmaster.emp_id', '=', 'me.id')
        ->leftjoin('categorymaster as ct','studentdetailsmaster.studentcategoryid', '=', 'ct.id')
        ->join('employeeinstitution as ei','studentdetailsmaster.studentinstitutionid', '=' , 'ei.collegeid' )
        // ->leftjoin('studentdetailsmaster as sd','studentdetailsmaster.stu_id', '=', 'sd.id')
 
        ->select('studentdetailsmaster.id',
        'studentdetailsmaster.photoname',
        'studentdetailsmaster.photofullpath',
        'studentdetailsmaster.studentid',
        'studentdetailsmaster.admissionnumber',
        'studentdetailsmaster.admissiondate',
        'studentdetailsmaster.firstname',
        'studentdetailsmaster.middlename',
        'studentdetailsmaster.lastname',
        'studentdetailsmaster.studentname',
        'studentdetailsmaster.studentphoto',
        'studentdetailsmaster.dob',
        'studentdetailsmaster.fathername',
        'studentdetailsmaster.mothername',
        'studentdetailsmaster.guardianname',
        'studentdetailsmaster.genderid','gm.gender',
        'studentdetailsmaster.religionid','rm.religion',
        'studentdetailsmaster.casteid','ca.castename',
        'studentdetailsmaster.communityid',
        'studentdetailsmaster.communicationaddress',
        'cm.community',
        'studentdetailsmaster.mothertongueid',
        'mt.mothertongue',
        'studentdetailsmaster.bloodgroupid',
        'bg.bloodgroup','studentdetailsmaster.identitymark',
        'studentdetailsmaster.registernumber','studentdetailsmaster.ssn_uid_number',
        'studentdetailsmaster.smobilenumber','studentdetailsmaster.semail',
        'ym.academicyear',
        'studentdetailsmaster.academicyearid',
        'studentdetailsmaster.mediumid',
        'mm.mediumname as mname',
    
        
        'studentdetailsmaster.foccupation',
        'studentdetailsmaster.father_qualificationid','qm.qualification as father_qualification',
        'studentdetailsmaster.fssn_uid_number',
        'studentdetailsmaster.fmobilenumber',
        'studentdetailsmaster.femail',
        'studentdetailsmaster.moccupation',
        'studentdetailsmaster.mother_qualificationid','qmm.qualification as mother_qualification',
        'studentdetailsmaster.mssn_uid_number',
        'studentdetailsmaster.mmobilenumber',
        'studentdetailsmaster.memail',
        'studentdetailsmaster.goccupation',
        'studentdetailsmaster.guardian_qualificationid','q.qualification as guardian_qualification',
        'studentdetailsmaster.gssn_uid_number',
        'studentdetailsmaster.gmobilenumber',
        'studentdetailsmaster.gemail',
        'studentdetailsmaster.raddress1',
        'studentdetailsmaster.raddress2',
        'studentdetailsmaster.raddress3','studentdetailsmaster.locationid','lm.locationname',
        'studentdetailsmaster.rdistrict',
        'studentdetailsmaster.rlandmark',
        'studentdetailsmaster.rpincode',
        'studentdetailsmaster.stateid','st.statename',
        'studentdetailsmaster.countryid','cy.countryname',
        'studentdetailsmaster.paddress1',
        'studentdetailsmaster.paddress2',
        'studentdetailsmaster.paddress3',
        'studentdetailsmaster.pdistrict',
        'studentdetailsmaster.plandmark',
        'studentdetailsmaster.ppincode',
        'studentdetailsmaster.raddress3','studentdetailsmaster.permanentcityname','lm.locationname as permanentcityname1',
        'studentdetailsmaster.permanentstatename','st.statename as permanentstatename1',
        'studentdetailsmaster.permanentcountryname','cy.countryname as permanentcountryname1',

        'studentdetailsmaster.annualincome',
        'studentdetailsmaster.accountname',
        'studentdetailsmaster.accountnumber',
        'studentdetailsmaster.banknameid','bm.bankname',
        'studentdetailsmaster.branchnameid','br.branchname',
        'studentdetailsmaster.ifsc_code','studentdetailsmaster.micr_number','studentdetailsmaster.institutename','studentdetailsmaster.yearid',
        'studentdetailsmaster.tc_number',
        'studentdetailsmaster.marksobtained',
        'studentdetailsmaster.address',
        'studentdetailsmaster.remarks',
        'studentdetailsmaster.mediumpreviousid','mmm.mediumname as mediumprevious',
        'studentdetailsmaster.coursepreviousid',
        'studentdetailsmaster.eligibility',
        'studentdetailsmaster.description',
        // 'studentdetailsmaster.firstlanguage',
        // 'studentdetailsmaster.secondlanguage',
        // 'studentdetailsmaster.rollnumber',
        'studentdetailsmaster.referencetypeid','r.referencetype','studentdetailsmaster.documentid',
        'dm.document','studentdetailsmaster.isactive',
      
       


        'studentdetailsmaster.familydoctorname',
        'studentdetailsmaster.familydoctornumber',
        'studentdetailsmaster.familydoctoraddress',

        'studentdetailsmaster.father_communicationnumber',
        'studentdetailsmaster.father_communicationemail',
        'studentdetailsmaster.father_organisationname',
        'studentdetailsmaster.father_organisationnumber',
        'studentdetailsmaster.father_organisationaddress',

        'studentdetailsmaster.mother_communicationnumber',
        'studentdetailsmaster.mother_communicationemail',
        'studentdetailsmaster.mother_organisationname',
        'studentdetailsmaster.mother_organisationnumber',
        'studentdetailsmaster.mother_organisationaddress',


        'studentdetailsmaster.guardian_communicationnumber',
        'studentdetailsmaster.guardian_communicationemail',
        'studentdetailsmaster.guardian_organisationname',
        'studentdetailsmaster.guardian_organisationnumber',
        'studentdetailsmaster.guardian_organisationaddress',
        'studentdetailsmaster.healthissue',
        'studentdetailsmaster.healthissuetype',
        'studentdetailsmaster.identitymark2',
        'studentdetailsmaster.remarks2',
        'aym.academicyear as year',
        'cmmm.course',
        'studentdetailsmaster.courseid',
        'studentdetailsmaster.sectionid',
        'se.sectionname',
        'cc.course as previouscourse',
        'studentdetailsmaster.applicationnumber',
        'studentdetailsmaster.differentaddress',
        'studentdetailsmaster.stu_id',
        'studentdetailsmaster.emp_id',
        'me.employeename',
        // 'sd.studentname',
        'studentdetailsmaster.others',
        'studentdetailsmaster.studentcategoryid',
        'ct.categoryname'

        )
        ->where('studentdetailsmaster.id',$id)
        ->get();
        return $ListData;
    }

 
    public function addStudent(Request $request)
    {
        $BloodGroupId=$request['BloodGroupId'] !== null ? $request['BloodGroupId'] : 0;
        $SectionId=$request['SectionId'] !== null ? $request['SectionId'] : 0;
        $LocationId=$request['LocationId'] !== null ? $request['LocationId'] : 0;
        $StateId=$request['StateId'] !== null ? $request['StateId'] : 0;
        $CountryId=$request['CountryId'] !== null ? $request['CountryId'] : 0;
        $PermanentStateName=$request['PermanentStateName'] !== null ? $request['PermanentStateName'] : 0;
        $PermanentCountryName=$request['PermanentCountryName'] !== null ? $request['PermanentCountryName'] : 0;
        $PermanentCityName=$request['PermanentCityName'] !== null ? $request['PermanentCityName'] : 0;
        $BankNameId=$request['BankNameId'] !== null ? $request['BankNameId'] : 0;
        $BranchNameId=$request['BranchNameId'] !== null ? $request['BranchNameId'] : 0;
        $CoursePreviousId=$request['CoursePreviousId'] !== null ? $request['CoursePreviousId'] : 0;
        $MediumPreviousId=$request['MediumPreviousId'] !== null ? $request['MediumPreviousId'] : 0;
        $YearId=$request['YearId'] !== null ? $request['YearId'] : 0;
        $DocumentId=$request['DocumentId'] !== null ? $request['DocumentId'] : 0;
        $ReferenceTypeId=$request['ReferenceTypeId'] !== null ? $request['ReferenceTypeId'] : 0;
        $StudentName=$request['FirstName']." ".$request['MiddleName']." ".$request['LastName'];
        $Father_QualificationId=$request['Father_QualificationId'] !== null ? $request['Father_QualificationId'] : 0;
        $Mother_QualificationId=$request['Mother_QualificationId'] !== null ? $request['Mother_QualificationId'] : 0;
        $Guardian_QualificationId=$request['Guardian_QualificationId'] !== null ? $request['Guardian_QualificationId'] : 0;
        $ReligionId=$request['ReligionId'] !== null ? $request['ReligionId'] : 0;
        $CasteId=$request['CasteId'] !== null ? $request['CasteId'] : 0;
        $GenderId=$request['GenderId'] !== null ? $request['GenderId'] : 0;
        $CommunityId=$request['CommunityId'] !== null ? $request['CommunityId'] : 0;
        $MotherTongueId=$request['MotherTongueId'] !== null ? $request['MotherTongueId'] : 0;
        $StudentCategory=$request['StudentCategory'] !== null ? $request['StudentCategory'] : 0;
        $InstitutionId=$request['InstitutionId'] !== null ? $request['InstitutionId'] : 0;
        
      
        
        $Admissiondate=date('Y-m-d', strtotime($request['AdmissionDate'])); 
        $Dob=date('Y-m-d', strtotime($request['DOB'])); 
        $data = [
            'id'=>$request['Id'],
            'institutionid'=>$request['InstitutionId'],
            'studentid'=>$request['StudentId'],
            'photoname'=>$request['PhotoName'],'PhotoFullPath'=>$request['PhotoFullPath'],
            'applicationnumber'=>$request['ApplicationNumber'],
            'admissionnumber'=>$request['AdmissionNumber'],
            'admissiondate'=>$Admissiondate,
            'firstname'=>$request['FirstName'],
            'middlename'=>$request['MiddleName'],
            'lastname'=>$request['LastName'],
            'studentname'=>$StudentName,
            'studentphoto'=>$request['StudentPhoto'],
            'dob'=>$Dob,
            'fathername'=>$request['FatherName'],
            
        'mothername'=>$request['MotherName'],
        'guardianname'=>$request['GuardianName'],
        'genderid'=>$GenderId,
        'religionid'=>$ReligionId,
        'mothertongueid'=>$MotherTongueId,
        'casteid'=>$CasteId,
        'communityid'=>$CommunityId,
        'bloodgroupid'=>$BloodGroupId,
        'identitymark'=>$request['IdentityMark'],
        'registernumber'=>$request['RegisterNumber'],
        'ssn_uid_number'=>$request['SSN_UID_Number'],
        'smobilenumber'=>$request['SMobileNumber'],
        'semail'=>$request['SEmail'],
        'academicyearid'=>$request['AcademicYearId'],
        'mediumid'=>$request['MediumId'],
        'courseid'=>$request['CourseId'],
        'sectionid'=>$SectionId,
       'stateid'=>$StateId,
       'countryid'=>$CountryId,

        'foccupation'=>$request['FOccupation'],
        'father_qualificationid'=>$Father_QualificationId,
        'fssn_uid_number'=>$request['FSSN_UID_Number'],
        'fmobilenumber'=>$request['FMobileNumber'],
        'femail'=>$request['FEmail'],
        'moccupation'=>$request['MOccupation'],
        'mother_qualificationid'=>$Mother_QualificationId,
        'mssn_uid_number'=>$request['MSSN_UID_Number'],
        'mmobilenumber'=>$request['MMobileNumber'],
        'memail'=>$request['MEmail'],
        'goccupation'=>$request['GOccupation'],
        'guardian_qualificationid'=>$Guardian_QualificationId,
        'gssn_uid_number'=>$request['GSSN_UID_Number'],
        'gmobilenumber'=>$request['GMobileNumber'],
        'gemail'=>$request['GEmail'],
        'raddress1'=>$request['RAddress1'],
        'raddress2'=>$request['RAddress2'],
        'raddress3'=>$request['RAddress3'],
        'locationid'=>$LocationId,
        'rdistrict'=>$request['RDistrict'],
        'rlandmark'=>$request['RLandmark'],
        'rpincode'=>$request['RPinCode'], 
        'communicationaddress'=>$request['CommunicationAddress'],
        'paddress1'=>$request['PAddress1'],
        'paddress2'=>$request['PAddress2'],
        'paddress3'=>$request['PAddress3'],
        'pdistrict'=>$request['PDistrict'],
        'plandmark'=>$request['PLandmark'],
        'ppincode'=>$request['PPinCode'],  
        'permanentstatename'=>$PermanentStateName,
        'permanentcountryname'=>$PermanentCountryName,
        'permanentcityname'=>$PermanentCityName,
        
        'annualincome'=>$request['AnnualIncome'],
        'accountname'=>$request['AccountName'],
        'accountnumber'=>$request['AccountNumber'],
        'banknameid'=>$BankNameId,
        'branchnameid'=>$BranchNameId,
        'ifsc_code'=>$request['IFSC_Code'],
        'micr_number'=>$request['MICR_Number'],
        'institutename'=>$request['InstituteName'],
        'yearid'=>$YearId,
        'mediumpreviousid'=>$MediumPreviousId,
        'coursepreviousid'=>$CoursePreviousId,
        'tc_number'=>$request['TC_Number'],
        'marksobtained'=>$request['MarksObtained'],
        'address'=>$request['Address'],
        'remarks'=>$request['Remarks'],
        'eligibility'=>$request['Eligibility'],
        'description'=>$request['Description'],
        'referencetypeid'=>$ReferenceTypeId,
        'emp_id'=>$request['Emp_Id'],
        'stu_id'=>$request['Stu_Id'],
        'others'=>$request['Others_Id'],
        'documentid'=>$DocumentId,


        'familydoctorname'=>$request['FamilyDoctorName'],
        'familydoctornumber'=>$request['FamilyDoctorNumber'],
        'familydoctoraddress'=>$request['FamilyDoctorAddress'],

        'father_communicationnumber'=>$request['Father_CommunicationNumber'],
        'father_communicationemail'=>$request['Father_CommunicationEmail'],
        'father_organisationname'=>$request['Father_OrganisationName'],
        'father_organisationnumber'=>$request['Father_OrganisationNumber'],
        'father_organisationaddress'=>$request['Father_OrganisationAddress'],

        'mother_communicationnumber'=>$request['Mother_CommunicationNumber'],
        'mother_communicationemail'=>$request['Mother_CommunicationEmail'],
        'mother_organisationname'=>$request['Mother_OrganisationName'],
        'mother_organisationnumber'=>$request['Mother_OrganisationNumber'],
        'mother_organisationaddress'=>$request['Mother_OrganisationAddress'],

        'guardian_communicationnumber'=>$request['Guardian_CommunicationNumber'],
        'guardian_communicationemail'=>$request['Guardian_CommunicationEmail'],
        'guardian_organisationname'=>$request['Guardian_OrganisationName'],
        'guardian_organisationnumber'=>$request['Guardian_OrganisationNumber'],
        'guardian_organisationaddress'=>$request['Guardian_OrganisationAddress'],

        'healthissue'=>$request['HealthIssue'],
        'healthissuetype'=>$request['HealthIssueType'],
        'identitymark2'=>$request['IdentityMark2'],
        'remarks2'=>$request['Remarks2'],
        'differentaddress'=>$request['DifferentAddress'],
        'studentcategoryid'=>$request['StudentCategory'],
        'studentinstitutionid'=>$request['collegeinstitutionid'],
    ];
        
		if($request['Id']==0)
		{
        $insert = DB::table('studentdetailsmaster')->insertGetId($data);
		if($insert == true)
		{
			return $insert;
		}else
		{
			return 0;
		}
		}
		else
		{
            $Update = DB::select('call studentdetails_auditadd(?)',[$request['Id']]);

            $update = DB::table('studentdetailsmaster')->where('id', $request['Id'])->update($data);
            
            return $request['Id'];            
		 }
    }



   
    public function inactive(Request $request)  {
        $id = $request['Id'];
        $inactive = DB::table('studentdetailsmaster')->where('id', $id)->update(['isactive'=>'0']);
        if($inactive == true)
        {
            return 1;
        }
        else
        {
           return 0;
        }
    }   
      
      public function active(Request $request)  {          
        $id = $request['Id'];
        $active = DB::table('studentdetailsmaster')->where('id', $id)->update(['isactive'=>'1']);
        if($active == true)
        {
            return 1;
        }
        else
        {
           return 0;
        }
    } 



 
    public function EditLanguage(Request $request)
    {
        $data = ['id'=>$request['Id'],'FirstLanguage'=>$request['FirstLanguage'],'secondlanguage'=>$request['SecondLanguage'],'rollnumber'=>$request['RollNumber']];
        
		// if($request['Id']>0)
	
		// {
        //      $update = DB::table('StudentDetailsHistory')->where('Id', $request['Id'])->update($data);
            
        //           return $request['Id'];
            
        //  }
        if($request['Id']==0)
		{
        $insert = DB::table('studentdetailshistory')->insertGetId($data);
		if($insert == true)
		{
			return $insert;
		}else
		{
			return 0;
		}
		}
    }

    public function StudentLogin(Request $request)
    {
        $data = ['loginname'=>$request['LoginName']];
        
		if($request['Id']>0)
	
		{
             $update = DB::table('studentdetailsmaster')->where('id', $request['Id'])->update($data);
            
                  return $request['Id'];
            
		 }
    }

    public function listLanguage(Request $request)
    {
        $mediumid = $request['MediumId']!== 0 ? $request['MediumId'] : 0;
        $courseid = $request['CourseId']!== 0 ? $request['CourseId'] : 0;
        $sectionid = $request['SectionId']!== 0 ? $request['SectionId'] : 0;
        $academicyearid = $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;
        $sname = $request['StudentName']!== null ? $request['StudentName'] : "";
        
       


        $ListData =
        DB::table('studentdetailsmaster')
        ->leftjoin('gendermaster as gm', 'studentdetailsmaster.genderid', '=', 'gm.id')
        ->leftjoin('religionmaster as rm', 'studentdetailsmaster.religionid', '=', 'rm.id')
        ->leftjoin('castemaster as ca', 'studentdetailsmaster.casteid', '=', 'ca.id')
        ->leftjoin('communitymaster as cm', 'studentdetailsmaster.communityid', '=', 'cm.id')
        ->leftjoin('mothertonguemaster as mt', 'studentdetailsmaster.mothertongueid', '=', 'mt.id')
        ->leftjoin('bloodgroupmaster as bg', 'studentdetailsmaster.bloodgroupid', '=', 'bg.id')
        ->leftjoin('yearmaster as ym', 'studentdetailsmaster.academicyearid', '=', 'ym.id')
        ->leftjoin('mediummasters as mm', 'studentdetailsmaster.mediumid', '=', 'mm.id')
        ->leftjoin('coursemaster as c', 'studentdetailsmaster.courseid', '=', 'c.id')
        ->leftjoin('sectionmaster as sm', 'studentdetailsmaster.sectionid', '=', 'sm.id')
        ->leftjoin('statemaster as st', 'studentdetailsmaster.stateid', '=', 'st.id')
        ->leftjoin('countrymaster as cy', 'studentdetailsmaster.countryid', '=', 'cy.id')
        ->leftjoin('bankmaster as bm', 'studentdetailsmaster.banknameid', '=', 'bm.id')
        ->leftjoin('branchmaster as br', 'studentdetailsmaster.branchnameid', '=', 'br.id')
        ->leftjoin('referencetypemaster as r', 'studentdetailsmaster.referencetypeid', '=', 'r.id')    ->leftjoin('documenttypemaster as dm', 'studentdetailsmaster.documentid', '=', 'dm.id')    
        
 
        ->select('studentdetailsmaster.id','studentdetailsmaster.photoname','studentdetailsmaster.photofullpath','studentdetailsmaster.studentid',
        'studentdetailsmaster.firstname','studentdetailsmaster.lastname',
        'studentdetailsmaster.studentname','studentdetailsmaster.admissionnumber',
        'studentdetailsmaster.mediumid','studentdetailsmaster.genderid','gm.gender',
        'studentdetailsmaster.fathername','studentdetailsmaster.dob',
        'studentdetailsmaster.sectionid','sm.sectionname','mm.mediumname','studentdetailsmaster.courseid','c.course','studentdetailsmaster.smobilenumber','studentdetailsmaster.isactive',
        'studentdetailsmaster.firstlanguage',
        'studentdetailsmaster.secondlanguage','studentdetailsmaster.rollnumber','studentdetailsmaster.academicyearid','ym.year as academicyear')
        ->whereraw("
                 (studentdetailsmaster.mediumid = '$mediumid' or ifnull('$mediumid',0)=0) and 
                 (studentdetailsmaster.courseid = '$courseid' or ifnull('$courseid',0)=0) and
                 (studentdetailsmaster.sectionid = '$sectionid' or ifnull('$sectionid',0)=0) and
                 (studentdetailsmaster.academicyearid = '$academicyearid' or ifnull('$academicyearid',0)=0) and 
                 (studentdetailsmaster.studentname like concat('%','$sname','%') || ifnull('$sname','') || '%')
                ")
        ->get();
        return $ListData;
    }

    public function StudentList()
    {
        $data = DB::table('studentdetailsmaster')->select('id','studentid','studentname')->orderBy('id','asc')->get();
        return $data;
    }


    public function StudentHistoryadd(Request $request)
    {

        // $roles = DB::table('StudentDetailsMaster')->lists('StudentName');
        //  $users = DB::table('StudentDetailsMaster')->get();

        $data = ['id'=>$request['Id'],'firstlanguage'=>$request['FirstLanguage'],'secondlanguage'=>$request['SecondLanguage'],'rollnumber'=>$request['RollNumber'],'studentnoid'=>$request['StudentNoId']];
        // $data1 = ['Id'=>$request['Id'],'FirstLanguage'=>$request['FirstLanguage'],'SecondLanguage'=>$request['SecondLanguage'],'RollNumber'=>$request['RollNumber'],'StudentId'=>$request['StudentId']];

	    $insert = DB::table('studentdetailshistory')->insertGetId($data);
        //$insert = DB::table('StudentDetailsHistory')->insertGetId($data1);
    //     if($request['Id']>0)
    //     {
    //     $update = DB::table('StudentDetailsMaster')->where('Id', $request['Id'])->update($data1);
        
    // }
       
       

		
    }


    public function StudentHistory(Request $request)
    {
       
        $data = [
        'FirstLanguage'=>$request['FirstLanguage'],
        'SecondLanguage'=>$request['SecondLanguage'],
        'RollNumber'=>$request['RollNumber']];
        
	// dd($data);
		if($request['Id']>0)
		{
             $update = DB::table('studentdetailsmaster')->where('id', $request['Id'])->update($data);
            
                  return $request['Id'];
            
		 }
    }
    public function StudentEnrollmentAdd(Request $request)
    {
        $data = [

            'studentid'=>$request['Id'],
            'academicyearid'=>$request['EnrollmentAcademicYearId'],
            'mediumid'=>$request['EnrollmentMediumId'],
            'courseid'=>$request['EnrollmentCourseId'],
            'sectionid'=>$request['EnrollmentSectionId'],
            'categoryid'=>$request['EnrollmentCategoryId'],

        ];
        // dd($data);
        if($request['Id']!=0)
		{
        $insert = DB::table('studentenrollment')->insertGetId($data);
		if($insert == true)
		{
			return $insert;
		}else
		{
			return 0;
		}
        }
    }

  
    public function UpdateEnrollment(Request $request)
    {
        // $data = [
        //     'Id'=>$request['Id'],
          
        //     'SectionId'=>$request['EnrollmentSectionId']
          

        // ];
        
		// if($request['Id']>0)
	
		// {
        //      $update = DB::table('StudentDetailsMaster')->where('Id', $request['Id'])->update($data);
            
        //           return $request['Id'];
            
        //  }
        
          $request['Id']=0;
        $MId=$request['Id'];
        $StudentId=$request['StudentId'];
        $AcademicYearId=$request['EnrollmentAcademicYearId'];
        $CourseId=$request['EnrollmentCourseId'];
        $SectionId=$request['EnrollmentSectionId'];
        
       
       
        // dd($CourseId);

        $Retid = DB::select('call studentenrollment_addedit(?,?,?,?,?)',[$MId,$StudentId,$AcademicYearId,$CourseId,$SectionId]);
    }
    public function addchildStudent(Request $request)
    {
         $request['Id']=0;
         $MId=$request['Id'];
         $StudentId=$request['StudentChildId'];
         $AcademicYearId=$request['AcademicYearId'];
         $CourseId=$request['CourseId'];
         $SectionId=$request['SectionId'];
        
         // dd($CourseId);
 
         $Retid = DB::select('call studentchildtable_addedit(?,?,?,?,?)',[$MId,$StudentId,$AcademicYearId,$CourseId,$SectionId]);

    }

    public function StudentChildView(Request $request)
    {
        // dd($request);
        $id = $request['AcademicId'];
        //dd($id);
      
        $ListData =
        DB::table('studentchildtable')
        ->join('coursemaster as cm', 'studentchildtable.courseid', '=', 'cm.id')
        ->leftjoin('studentdetailsmaster as sd', 'studentchildtable.studentid', '=', 'sd.id')
        
        ->select('studentchildtable.id','studentchildtable.courseid','cm.course','studentchildtable.studentid','studentchildtable.academicyearid')
        ->where('studentchildtable.academicyearid',$id)
      
        ->get();
        //dd($ListData);
        return $ListData;
    }
    public function AdmissionNumberDuplicate(Request $request)     
    {
        $Id=$request['Id'];
        //dd($Id);
        $AdmissionNumber=$request['AdmissionNumber'];
      
        $data = DB::select('call admissionnumber_duplicatecheck(?,?)',[$Id,$AdmissionNumber]);
              
        //dd($data);    
       
      
        return $data;
    }
    public function StudentEnrollmentfill(Request $request)     
    {
     $StudentId =  $request['StudentId'];
        $AcademicYearId=$request['AcademicYearId'];
      
      
        $data = DB::select('call enrollmentautofill(?,?)',[$StudentId,$AcademicYearId]);
        return $data;
    }
    

    public function update_Enquirystatus(Request $request)  
    {         

        $Id = $request['Id'];
        $StatusId =$request['StatusId'];
        //dd($StatusId);
        $active = DB::table('enquiryformmaster')->where('id', $Id)->update(['statusid'=> $StatusId]);
        
        if($active == true)
        {
            return 1;
        }
        else
        {
           return 0;
        }
     } 

     public function StudentNamelist(Request $request)
     {
        $InstitutionId =$request['InstitutionId'];
         $data = DB::table('studentdetailsmaster')->select('id','StudentName')->where('institutionid',$InstitutionId)
         ->orderBy('studentname','asc')->get();
         return $data;
     }

}
