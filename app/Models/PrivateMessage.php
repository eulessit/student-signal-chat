<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrivateMessage extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $appends = ['isSender'];

    public function getIsSenderAttribute()
    {
        return $this->user_id === auth()->id();
    }
}
