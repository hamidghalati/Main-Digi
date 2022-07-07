<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ItemModel extends Model
{
    protected $table='items';
    protected $fillable=['category_id','title','position','show_item','parent_id'];
    public static function addItem($items,$child_item,$checked_item,$cat_id)
    {
        $parent_position=0;
        foreach ($items as $key=>$value)
        {
            if ($key<0 && !empty($value))
            {
                $parent_position++;
                $id=self::insertGetId(['title'=>$value,'category_id'=>$cat_id,'parent_id'=>0,'position'=>$parent_position]);
                self::add_child_items($key,$child_item,$id,$checked_item,$cat_id);
            }
        }

    }


    public static function add_child_items($key,$child_item,$item_id,$checked_item,$cat_id)
    {
        if (array_key_exists($key,$child_item))
        {$child_position=0;
            foreach ($child_item[$key] as $key2=>$value2)
            {
                if (!empty($value2))
                {
                    $show_item=self::getShowItemValue($checked_item,$key,$key2);
                    $child_position++;
                    if ($key2<0)
                    {
                        self::insert(['title'=>$value2,'parent_id'=>$item_id,'category_id'=>$cat_id,'position'=>$child_position,'show_item'=>$show_item]);
                    }
                }
            }


        }
    }


    public static function getShowItemValue($checked_item,$key,$key2)
    {
        if (array_key_exists($key,$checked_item))
        {
            if (array_key_exists($key2,$checked_item[$key]))
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
        else
        {
            return 0;
        }
    }





}
