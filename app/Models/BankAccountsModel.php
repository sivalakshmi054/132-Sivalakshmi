<?php

namespace SchoolManagement;

use Illuminate\Database\Eloquent\Model;

class BankAccountsModel extends Model
{
    protected $table = 'BankAccounts';    
    protected $fillable = ['Id','Name','AccountNumber','BankName','BranchName','IFSC_Code','MICR_Number'];
}
