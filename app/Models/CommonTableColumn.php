<?php

namespace SchoolManagement\Models;

use Illuminate\Database\Eloquent\Model;

class CommonTableColumn extends Model
{
    protected $table = 'CommonTableColumns';
    
    public $fillable = ['Id','IsActive','CommonTable_Id','DBColumnName', 'UIColumnName','UIMaxLength','UIMandatory','FieldType', 'ValidationType','ListSql','DDSql','IsPk', 'IsDefault','DisplayOrder','ListRequired','ListWidth','SortingRequired','SearchColumn','IsUnique'];
}

// class TableColumnModel extends Model
// {
//     protected $table = 'TableColumnModel';
    
//     public $fillable = ['TableColumnItem','DBColumnResult','IsActive','DBColumnName', 'ddlResult'];
// }
