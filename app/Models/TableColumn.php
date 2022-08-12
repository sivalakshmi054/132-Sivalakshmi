<?php

namespace SchoolManagement\Models;

use Illuminate\Database\Eloquent\Model;

class TableColumn extends Model
{
   
    public $fillable = ['Id',
    'CommonTable_Id','CommonTableName','DBColumnName',
    'UIColumnName','UIMaxLength','UIMandatory',
    'FieldType','ValidationType','DDSql','IsPk',
    'IsUnique','UniqueColumn','IsDefault','DisplayOrder',
    'ListRequired','ListWidth','SortingRequired',
    'SearchColumn','IsActive','ActiveColumn','FilterColumn'
    ];
}