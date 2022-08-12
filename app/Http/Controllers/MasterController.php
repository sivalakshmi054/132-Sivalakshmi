<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use SchoolManagement\Models\CommonTable;
use SchoolManagement\Models\CommonTableColumn;
use SchoolManagement\Models\MasterTableDropdownList;
use SchoolManagement\Models\TableColumnResult;
use SchoolManagement\Models\TableColumn;
use DB;
use System;

class MasterController extends Controller
{
    
    public function Masterdropdown() 
    {
        $MastersList= DB::select('call commontable_sp_select()'); 
        return $MastersList;
    }
    
    public function Mastercolumnlist(Request $request) 
    {
        $CommonTable_Id=$request->CommonTable_Id;
        $ListData = DB::select('call tablecolumn_sp_select(?)',[$CommonTable_Id]);   
        return $ListData;
    } 
   
    
    public function MastercolumnDetails(Request $request) 
    {
        $Resultlst= array();          
        $tblList= new CommonTableColumn();
        $tblListMaster = new CommonTable();

        $CommonTable_Id= $request->CommonTable_Id;
        $tblList=DB::select('call tablecolumn_sp_select(?)',[$CommonTable_Id]);

        $Id= $request->Id;
        $CommonTable_Id= $request->CommonTable_Id;

        $ListDetailsData = DB::select('call tablecolumn_sp_list(?,?)',[$Id, $CommonTable_Id]);

        $rst = array();        
        $rst["DBColumnResult"] = null;
        $rst["IsActive"] = 0;
        $rst["ddlResult"] = null;
        $rst["TableColumnItem"] = null;

        foreach($ListDetailsData as $ListDetails)
        {            
             foreach($tblList as $item)
             {   
                 $rst["TableColumnItem"] = $item;
                 $temp = $item->dbcolumnname;
                 $resulttemp = $ListDetails->$temp;
                 $rst["DBColumnResult"] = (string) $resulttemp;
                 //$rst["DBColumnResult"] = $ListDetails->$temp;
                 //dd([Count($tblList)-1]);
               // if ($ListDetails[count($ListDetails)-1] == "IsActive")
                // {
                //   $rst["IsActive"] = (int)dr[dt.Columns.Count - 1];
                   //  $rst["IsActive"] = (int) $ListDetails[count($ListDetails)-1];
                   $rst["IsActive"] = (int) $ListDetails->isactive;                     
                // }
                //  else
                //  {
                //      $rst["IsActive"] = -1;
                //  }
                 $Resultlst[] = $rst;
             }
        }
        return $Resultlst;
    } 
    
    public function MastercolumnView(Request $request)     
    {
        $CommonTable_Id=$request->CommonTable_Id;
        $PKId=$request->PKId;
        $Resultlst= array(); 
        $tblList = DB::select('call tablecolumn_sp_select(?)',[$CommonTable_Id]);
        
        $dr ='';
        if ($PKId > 0)
        {
            $ColumnView = DB::select('call tablecolumn_sp_view(?,?)',[$CommonTable_Id, $PKId]);
            $dr = $ColumnView[0];            
        }

        $rst = array();        
        $rst["DBColumnResult"] = null;
        $rst["IsActive"] = 0;
        $rst["ddlResult"] = null;
        $rst["TableColumnItem"] = null;

        foreach($tblList as $item)
        {
            $rst["TableColumnItem"] = $item;
            if($dr != null)
            {
                $temp = $item->dbcolumnname;
                $resulttemp = $dr->$temp;
                $rst["DBColumnResult"] = (string) $resulttemp;
            }
            if($item->fieldtype == 3)
            {                
                $rst["ddlResult"] = DB::select('call master_sp_dropdownfill(?)',[$item->Id]);     
            }
            else
            {
                $rst["ddlResult"] = null;
            }           
            $Resultlst[] = $rst;
        }        
        return $Resultlst;
    } 
    
    public function SaveMasterColumns(Request $request)   
    {
        $returnIdvalue = "";
        $sql = "";
        $selectval = "";
        $sqlselect = "";
        $tableName = "";
        $tableNamedup = "";
        $selectvaldup = "";
        $sqlselectdup = "";
        $StartTag = "";
        $startendTag = "";
        $Errorlist = "";
        $sqlquery = "";
        $ColumnName = "";
        $SelectId = 0;
        $i = 1;

        $data = array();  
        $result = array();  
        $result = $request->all();
        $Name = "";
        $lstVal = null;
        $query = '';
        $IdValue = 0;
        $RepId = 0;

        foreach($result as $lst)
        {
            if($lst["TableColumnItem"]["ispk"] == 1)
            {
                $IdValue = $lst["DBColumnResult"];
            }
            
            if($lst["TableColumnItem"]["isunique"] == 1)
            {
                $tableName = $lst["TableColumnItem"]["commontablename"];
                $UniqueColumn = $lst["TableColumnItem"]["uniquecolumn"]; 
                if($IdValue > 0)
                {
                    $sqlselect = "select * from ".$tableName." where id != " . $IdValue;
                }
                else
                {
                    $sqlselect = "select * from ".$tableName." where 1=1";
                }                

                $values = array_map('trim', explode(',', $UniqueColumn));
                foreach($values as $uniqueval)
                   {
                       
                       foreach($result as $lstcheck)
                       {
                            if((string) $lstcheck["TableColumnItem"]["id"] == $uniqueval)
                            {
                                $lstVal = $lstcheck;
                            }
                            
                       }
                       if ($lstVal["TableColumnItem"]["validationtype"] == 1)
                        {
                            $startendTag = "'";
                            $StartTag = "'";
                        }
                        else
                        {
                            $startendTag = "";
                        }                        
                        $sqlselect = $sqlselect." and ".$lstVal["TableColumnItem"]["dbcolumnname"];
                        $ColumnName = $lstVal["TableColumnItem"]["uicolumnname"];
                        $selectvaldup = $StartTag.$lstVal["DBColumnResult"].$startendTag;
                        $sqlselect = $sqlselect. "=".$selectvaldup;
                   }                  
                   
                   $query = DB::select(DB::raw($sqlselect));

                   if(count($query) != 0)
                   {                     
                     $Errorlist = $Errorlist . $lstVal["TableColumnItem"]["uicolumnname"] . " cannot duplicate please check.";
                   } 
            }
        }        
        

        if($Errorlist != '')
        {    
            return $Errorlist;  
        }
        else
        {
            foreach($result as $lst)
            {
                if($lst["TableColumnItem"]["isdefault"] == 0)
                {     
                    $data[$lst["TableColumnItem"]["dbcolumnname"]] = $lst["DBColumnResult"];  
                }      
            }
            $data["InstitutionId"] = $lst["InstitutionId"];  
            if($IdValue == 0)
            {
                $returnIdvalue = DB::table($tableName)->insertGetId($data);
            }
            else
            {                
                $returnIdvalue = $IdValue;
                $update = DB::table($tableName)->where('id', $returnIdvalue)->update($data);  
            }
            return $returnIdvalue; 
        }       
    } 

    public function ActiveMasters(Request $request)
    {
        try
        {
            $retFlat = 1;
            $MasterId=$request->MasterId;
            $Id=$request->Id;
            $Active=$request->Active;
            DB::select('call master_active(?,?,?)',[$MasterId,$Id,$Active]);
            return $retFlat;
        }
        catch (Exception $e)
        {
            return 0;
        }
    }   
      
    public function InactiveMasters(Request $request) 
    {
        try
        {
            $retFlat = 1;
            $MasterId=$request->MasterId;
            $Id=$request->Id;
            $Active=$request->Active;
            DB::select('call masteritem_delete(?,?,?)',[$MasterId,$Id,$Active]);        
            return $retFlat;
        }
        catch (Exception $e)
        {
            return 0;
        }
    }       
}