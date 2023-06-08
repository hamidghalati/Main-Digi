<?php

namespace App;

use DB;

class Setting
{

    public function set_data($data)
    {
        $update_data = array();
        foreach ($data as $key => $value) {
            if ($key != "_token") {
                $this->add_table($key, $value);
                $update_data[$key] = $value;
            }
        }
        return $update_data;
    }

    public function add_table($key, $value)
    {
        $row = DB::table('setting')->where('option_name', $key)->first();
        if ($row) {
            if (!empty($value)) {
                DB::table('setting')->where('option_name', $key)->update(['option_value' => $value]);
            } else {
                DB::table('setting')->where('option_name', $key)->delete();
            }
        } else {
            if (!empty($value)) {
                DB::table('setting')->insert([
                    'option_name' => $key,
                    'option_value' => $value
                ]);

            }

        }
    }

    public function get_data($key)
    {
        $fetch_data = array();
        foreach ($key as $option_name) {
            $row = DB::table('setting')->where('option_name', $option_name)->first();
            if ($row) {
                $fetch_data[$option_name] = $row->option_value;
            } else {
                $fetch_data[$option_name] = '';
            }
        }
        return $fetch_data;
    }

    public function addConfig($request)
    {
        $config = config('shop-info');
        $data = $request->all();
        $array = ['jpg', 'jpeg', 'gif', 'png', 'bmp','svg'];
        foreach ($data as $key => $value) {
            if ($key != "_token") {
                if (!empty($value)) {
                    if ($request->hasFile($key)) {
                        $ex = $request->file($key)->getClientoriginalExtension();
                        if (in_array($ex, $array)) {
                            $img_url = uploade_file($request, $key, 'images');
                            if ($img_url != null) {
                                $config[$key] = 'files/images/' . $img_url;
                            }
                        }

                    } else {
                        $config[$key] = $value;
                    }
                }
            }
        }

        $text = '<?php
return '.var_export($config, true).' ;';

        file_put_contents(config_path('shop-info.php'), $text);
    }


}
