<?php

use App\CatBrand;
use App\CategoriesModel;
use App\GiftCart;
use App\Lib\jdf;
use App\ProductColorModel;
use App\ProductPriceModel;
use App\ProductWarranty;
use Illuminate\Support\Facades\DB;
use Intervention\Image\Facades\Image;
use Hekmatinasser\Verta\Verta;

function jdate($format, $timestamp = '', $none = '', $time_zone = 'Asia/Tehran', $tr_num = 'fa')
{

    $T_sec = 0;/* <= رفع خطاي زمان سرور ، با اعداد '+' و '-' بر حسب ثانيه */

    if ($time_zone != 'local') date_default_timezone_set(($time_zone === '') ? 'Asia/Tehran' : $time_zone);
    $ts = $T_sec + (($timestamp === '') ? time() : tr_num($timestamp));
    $date = explode('_', date('H_i_j_n_O_P_s_w_Y', $ts));
    list($j_y, $j_m, $j_d) = gregorian_to_jalali($date[8], $date[3], $date[2]);
    $doy = ($j_m < 7) ? (($j_m - 1) * 31) + $j_d - 1 : (($j_m - 7) * 30) + $j_d + 185;
    $kab = (((($j_y + 12) % 33) % 4) == 1) ? 1 : 0;
    $sl = strlen($format);
    $out = '';
    for ($i = 0; $i < $sl; $i++) {
        $sub = substr($format, $i, 1);
        if ($sub == '\\') {
            $out .= substr($format, ++$i, 1);
            continue;
        }
        switch ($sub) {

            case 'E':
            case 'R':
            case 'x':
            case 'X':
                $out .= 'http://jdf.scr.ir';
                break;

            case 'B':
            case 'e':
            case 'g':
            case 'G':
            case 'h':
            case 'I':
            case 'T':
            case 'u':
            case 'Z':
                $out .= date($sub, $ts);
                break;

            case 'a':
                $out .= ($date[0] < 12) ? 'ق.ظ' : 'ب.ظ';
                break;

            case 'A':
                $out .= ($date[0] < 12) ? 'قبل از ظهر' : 'بعد از ظهر';
                break;

            case 'b':
                $out .= (int)($j_m / 3.1) + 1;
                break;

            case 'c':
                $out .= $j_y . '/' . $j_m . '/' . $j_d . ' ،' . $date[0] . ':' . $date[1] . ':' . $date[6] . ' ' . $date[5];
                break;

            case 'C':
                $out .= (int)(($j_y + 99) / 100);
                break;

            case 'd':
                $out .= ($j_d < 10) ? '0' . $j_d : $j_d;
                break;

            case 'D':
                $out .= jdate_words(array('kh' => $date[7]), ' ');
                break;

            case 'f':
                $out .= jdate_words(array('ff' => $j_m), ' ');
                break;

            case 'F':
                $out .= jdate_words(array('mm' => $j_m), ' ');
                break;

            case 'H':
                $out .= $date[0];
                break;

            case 'i':
                $out .= $date[1];
                break;

            case 'j':
                $out .= $j_d;
                break;

            case 'J':
                $out .= jdate_words(array('rr' => $j_d), ' ');
                break;

            case 'k';
                $out .= tr_num(100 - (int)($doy / ($kab + 365.24) * 1000) / 10, $tr_num);
                break;

            case 'K':
                $out .= tr_num((int)($doy / ($kab + 365.24) * 1000) / 10, $tr_num);
                break;

            case 'l':
                $out .= jdate_words(array('rh' => $date[7]), ' ');
                break;

            case 'L':
                $out .= $kab;
                break;

            case 'm':
                $out .= ($j_m > 9) ? $j_m : '0' . $j_m;
                break;

            case 'M':
                $out .= jdate_words(array('km' => $j_m), ' ');
                break;

            case 'n':
                $out .= $j_m;
                break;

            case 'N':
                $out .= $date[7] + 1;
                break;

            case 'o':
                $jdw = ($date[7] == 6) ? 0 : $date[7] + 1;
                $dny = 364 + $kab - $doy;
                $out .= ($jdw > ($doy + 3) and $doy < 3) ? $j_y - 1 : (((3 - $dny) > $jdw and $dny < 3) ? $j_y + 1 : $j_y);
                break;

            case 'O':
                $out .= $date[4];
                break;

            case 'p':
                $out .= jdate_words(array('mb' => $j_m), ' ');
                break;

            case 'P':
                $out .= $date[5];
                break;

            case 'q':
                $out .= jdate_words(array('sh' => $j_y), ' ');
                break;

            case 'Q':
                $out .= $kab + 364 - $doy;
                break;

            case 'r':
                $key = jdate_words(array('rh' => $date[7], 'mm' => $j_m));
                $out .= $date[0] . ':' . $date[1] . ':' . $date[6] . ' ' . $date[4] . ' ' . $key['rh'] . '، ' . $j_d . ' ' . $key['mm'] . ' ' . $j_y;
                break;

            case 's':
                $out .= $date[6];
                break;

            case 'S':
                $out .= 'ام';
                break;

            case 't':
                $out .= ($j_m != 12) ? (31 - (int)($j_m / 6.5)) : ($kab + 29);
                break;

            case 'U':
                $out .= $ts;
                break;

            case 'v':
                $out .= jdate_words(array('ss' => ($j_y % 100)), ' ');
                break;

            case 'V':
                $out .= jdate_words(array('ss' => $j_y), ' ');
                break;

            case 'w':
                $out .= ($date[7] == 6) ? 0 : $date[7] + 1;
                break;

            case 'W':
                $avs = (($date[7] == 6) ? 0 : $date[7] + 1) - ($doy % 7);
                if ($avs < 0) $avs += 7;
                $num = (int)(($doy + $avs) / 7);
                if ($avs < 4) {
                    $num++;
                } elseif ($num < 1) {
                    $num = ($avs == 4 or $avs == ((((($j_y % 33) % 4) - 2) == ((int)(($j_y % 33) * 0.05))) ? 5 : 4)) ? 53 : 52;
                }
                $aks = $avs + $kab;
                if ($aks == 7) $aks = 0;
                $out .= (($kab + 363 - $doy) < $aks and $aks < 3) ? '01' : (($num < 10) ? '0' . $num : $num);
                break;

            case 'y':
                $out .= substr($j_y, 2, 2);
                break;

            case 'Y':
                $out .= $j_y;
                break;

            case 'z':
                $out .= $doy;
                break;

            default:
                $out .= $sub;
        }
    }
    return ($tr_num != 'en') ? tr_num($out, 'fa', '.') : $out;
}

/*	F	*/
function jstrftime($format, $timestamp = '', $none = '', $time_zone = 'Asia/Tehran', $tr_num = 'fa')
{

    $T_sec = 0;/* <= رفع خطاي زمان سرور ، با اعداد '+' و '-' بر حسب ثانيه */

    if ($time_zone != 'local') date_default_timezone_set(($time_zone === '') ? 'Asia/Tehran' : $time_zone);
    $ts = $T_sec + (($timestamp === '') ? time() : tr_num($timestamp));
    $date = explode('_', date('h_H_i_j_n_s_w_Y', $ts));
    list($j_y, $j_m, $j_d) = gregorian_to_jalali($date[7], $date[4], $date[3]);
    $doy = ($j_m < 7) ? (($j_m - 1) * 31) + $j_d - 1 : (($j_m - 7) * 30) + $j_d + 185;
    $kab = (((($j_y + 12) % 33) % 4) == 1) ? 1 : 0;
    $sl = strlen($format);
    $out = '';
    for ($i = 0; $i < $sl; $i++) {
        $sub = substr($format, $i, 1);
        if ($sub == '%') {
            $sub = substr($format, ++$i, 1);
        } else {
            $out .= $sub;
            continue;
        }
        switch ($sub) {

            /* Day */
            case 'a':
                $out .= jdate_words(array('kh' => $date[6]), ' ');
                break;

            case 'A':
                $out .= jdate_words(array('rh' => $date[6]), ' ');
                break;

            case 'd':
                $out .= ($j_d < 10) ? '0' . $j_d : $j_d;
                break;

            case 'e':
                $out .= ($j_d < 10) ? ' ' . $j_d : $j_d;
                break;

            case 'j':
                $out .= str_pad($doy + 1, 3, 0, STR_PAD_LEFT);
                break;

            case 'u':
                $out .= $date[6] + 1;
                break;

            case 'w':
                $out .= ($date[6] == 6) ? 0 : $date[6] + 1;
                break;

            /* Week */
            case 'U':
                $avs = (($date[6] < 5) ? $date[6] + 2 : $date[6] - 5) - ($doy % 7);
                if ($avs < 0) $avs += 7;
                $num = (int)(($doy + $avs) / 7) + 1;
                if ($avs > 3 or $avs == 1) $num--;
                $out .= ($num < 10) ? '0' . $num : $num;
                break;

            case 'V':
                $avs = (($date[6] == 6) ? 0 : $date[6] + 1) - ($doy % 7);
                if ($avs < 0) $avs += 7;
                $num = (int)(($doy + $avs) / 7);
                if ($avs < 4) {
                    $num++;
                } elseif ($num < 1) {
                    $num = ($avs == 4 or $avs == ((((($j_y % 33) % 4) - 2) == ((int)(($j_y % 33) * 0.05))) ? 5 : 4)) ? 53 : 52;
                }
                $aks = $avs + $kab;
                if ($aks == 7) $aks = 0;
                $out .= (($kab + 363 - $doy) < $aks and $aks < 3) ? '01' : (($num < 10) ? '0' . $num : $num);
                break;

            case 'W':
                $avs = (($date[6] == 6) ? 0 : $date[6] + 1) - ($doy % 7);
                if ($avs < 0) $avs += 7;
                $num = (int)(($doy + $avs) / 7) + 1;
                if ($avs > 3) $num--;
                $out .= ($num < 10) ? '0' . $num : $num;
                break;

            /* Month */
            case 'b':
            case 'h':
                $out .= jdate_words(array('km' => $j_m), ' ');
                break;

            case 'B':
                $out .= jdate_words(array('mm' => $j_m), ' ');
                break;

            case 'm':
                $out .= ($j_m > 9) ? $j_m : '0' . $j_m;
                break;

            /* Year */
            case 'C':
                $tmp = (int)($j_y / 100);
                $out .= ($tmp > 9) ? $tmp : '0' . $tmp;
                break;

            case 'g':
                $jdw = ($date[6] == 6) ? 0 : $date[6] + 1;
                $dny = 364 + $kab - $doy;
                $out .= substr(($jdw > ($doy + 3) and $doy < 3) ? $j_y - 1 : (((3 - $dny) > $jdw and $dny < 3) ? $j_y + 1 : $j_y), 2, 2);
                break;

            case 'G':
                $jdw = ($date[6] == 6) ? 0 : $date[6] + 1;
                $dny = 364 + $kab - $doy;
                $out .= ($jdw > ($doy + 3) and $doy < 3) ? $j_y - 1 : (((3 - $dny) > $jdw and $dny < 3) ? $j_y + 1 : $j_y);
                break;

            case 'y':
                $out .= substr($j_y, 2, 2);
                break;

            case 'Y':
                $out .= $j_y;
                break;

            /* Time */
            case 'H':
                $out .= $date[1];
                break;

            case 'I':
                $out .= $date[0];
                break;

            case 'l':
                $out .= ($date[0] > 9) ? $date[0] : ' ' . (int)$date[0];
                break;

            case 'M':
                $out .= $date[2];
                break;

            case 'p':
                $out .= ($date[1] < 12) ? 'قبل از ظهر' : 'بعد از ظهر';
                break;

            case 'P':
                $out .= ($date[1] < 12) ? 'ق.ظ' : 'ب.ظ';
                break;

            case 'r':
                $out .= $date[0] . ':' . $date[2] . ':' . $date[5] . ' ' . (($date[1] < 12) ? 'قبل از ظهر' : 'بعد از ظهر');
                break;

            case 'R':
                $out .= $date[1] . ':' . $date[2];
                break;

            case 'S':
                $out .= $date[5];
                break;

            case 'T':
                $out .= $date[1] . ':' . $date[2] . ':' . $date[5];
                break;

            case 'X':
                $out .= $date[0] . ':' . $date[2] . ':' . $date[5];
                break;

            case 'z':
                $out .= date('O', $ts);
                break;

            case 'Z':
                $out .= date('T', $ts);
                break;

            /* Time and Date Stamps */
            case 'c':
                $key = jdate_words(array('rh' => $date[6], 'mm' => $j_m));
                $out .= $date[1] . ':' . $date[2] . ':' . $date[5] . ' ' . date('P', $ts) . ' ' . $key['rh'] . '، ' . $j_d . ' ' . $key['mm'] . ' ' . $j_y;
                break;

            case 'D':
                $out .= substr($j_y, 2, 2) . '/' . (($j_m > 9) ? $j_m : '0' . $j_m) . '/' . (($j_d < 10) ? '0' . $j_d : $j_d);
                break;

            case 'F':
                $out .= $j_y . '-' . (($j_m > 9) ? $j_m : '0' . $j_m) . '-' . (($j_d < 10) ? '0' . $j_d : $j_d);
                break;

            case 's':
                $out .= $ts;
                break;

            case 'x':
                $out .= substr($j_y, 2, 2) . '/' . (($j_m > 9) ? $j_m : '0' . $j_m) . '/' . (($j_d < 10) ? '0' . $j_d : $j_d);
                break;

            /* Miscellaneous */
            case 'n':
                $out .= "\n";
                break;

            case 't':
                $out .= "\t";
                break;

            case '%':
                $out .= '%';
                break;

            default:
                $out .= $sub;
        }
    }
    return ($tr_num != 'en') ? tr_num($out, 'fa', '.') : $out;
}

/*	F	*/
function jmktime($h = '', $m = '', $s = '', $jm = '', $jd = '', $jy = '', $none = '', $timezone = 'Asia/Tehran')
{
    if ($timezone != 'local') date_default_timezone_set($timezone);
    if ($h === '') {
        return time();
    } else {
        list($h, $m, $s, $jm, $jd, $jy) = explode('_', tr_num($h . '_' . $m . '_' . $s . '_' . $jm . '_' . $jd . '_' . $jy));
        if ($m === '') {
            return mktime($h);
        } else {
            if ($s === '') {
                return mktime($h, $m);
            } else {
                if ($jm === '') {
                    return mktime($h, $m, $s);
                } else {
                    $jdate = explode('_', jdate('Y_j', '', '', $timezone, 'en'));
                    if ($jd === '') {
                        list($gy, $gm, $gd) = jalali_to_gregorian($jdate[0], $jm, $jdate[1]);
                        return mktime($h, $m, $s, $gm);
                    } else {
                        if ($jy === '') {
                            list($gy, $gm, $gd) = jalali_to_gregorian($jdate[0], $jm, $jd);
                            return mktime($h, $m, $s, $gm, $gd);
                        } else {
                            list($gy, $gm, $gd) = jalali_to_gregorian($jy, $jm, $jd);
                            return mktime($h, $m, $s, $gm, $gd, $gy);
                        }
                    }
                }
            }
        }
    }
}

/*	F	*/
function jgetdate($timestamp = '', $none = '', $timezone = 'Asia/Tehran', $tn = 'en')
{
    $ts = ($timestamp === '') ? time() : tr_num($timestamp);
    $jdate = explode('_', jdate('F_G_i_j_l_n_s_w_Y_z', $ts, '', $timezone, $tn));
    return array(
        'seconds' => tr_num((int)tr_num($jdate[6]), $tn),
        'minutes' => tr_num((int)tr_num($jdate[2]), $tn),
        'hours' => $jdate[1],
        'mday' => $jdate[3],
        'wday' => $jdate[7],
        'mon' => $jdate[5],
        'year' => $jdate[8],
        'yday' => $jdate[9],
        'weekday' => $jdate[4],
        'month' => $jdate[0],
        0 => tr_num($ts, $tn)
    );
}

/*	F	*/
function jcheckdate($jm, $jd, $jy)
{
    list($jm, $jd, $jy) = explode('_', tr_num($jm . '_' . $jd . '_' . $jy));
    $l_d = ($jm == 12 and ((($jy + 12) % 33) % 4) != 1) ? 29 : (31 - (int)($jm / 6.5));
    return ($jm > 12 or $jd > $l_d or $jm < 1 or $jd < 1 or $jy < 1) ? false : true;
}

/*	F	*/
function tr_num($str, $mod = 'en', $mf = '٫')
{
    $num_a = array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.');
    $key_a = array('۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', $mf);
    return ($mod == 'fa') ? str_replace($num_a, $key_a, $str) : str_replace($key_a, $num_a, $str);
}

/*	F	*/
function jdate_words($array, $mod = '')
{
    foreach ($array as $type => $num) {
        $num = (int)tr_num($num);
        switch ($type) {

            case 'ss':
                $sl = strlen($num);
                $xy3 = substr($num, 2 - $sl, 1);
                $h3 = $h34 = $h4 = '';
                if ($xy3 == 1) {
                    $p34 = '';
                    $k34 = array('ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده');
                    $h34 = $k34[substr($num, 2 - $sl, 2) - 10];
                } else {
                    $xy4 = substr($num, 3 - $sl, 1);
                    $p34 = ($xy3 == 0 or $xy4 == 0) ? '' : ' و ';
                    $k3 = array('', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود');
                    $h3 = $k3[$xy3];
                    $k4 = array('', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه');
                    $h4 = $k4[$xy4];
                }
                $array[$type] = (($num > 99) ? str_replace(
                            array('12', '13', '14', '19', '20'),
                            array('هزار و دویست', 'هزار و سیصد', 'هزار و چهارصد', 'هزار و نهصد', 'دوهزار'),
                            substr($num, 0, 2)
                        ) . ((substr($num, 2, 2) == '00') ? '' : ' و ') : '') . $h3 . $p34 . $h34 . $h4;
                break;

            case 'mm':
                $key = array('فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند');
                $array[$type] = $key[$num - 1];
                break;

            case 'rr':
                $key = array(
                    'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه', 'ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده', 'بیست', 'بیست و یک', 'بیست و دو', 'بیست و سه', 'بیست و چهار', 'بیست و پنج', 'بیست و شش', 'بیست و هفت', 'بیست و هشت', 'بیست و نه', 'سی', 'سی و یک'
                );
                $array[$type] = $key[$num - 1];
                break;

            case 'rh':
                $key = array('یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه');
                $array[$type] = $key[$num];
                break;

            case 'sh':
                $key = array('مار', 'اسب', 'گوسفند', 'میمون', 'مرغ', 'سگ', 'خوک', 'موش', 'گاو', 'پلنگ', 'خرگوش', 'نهنگ');
                $array[$type] = $key[$num % 12];
                break;

            case 'mb':
                $key = array('حمل', 'ثور', 'جوزا', 'سرطان', 'اسد', 'سنبله', 'میزان', 'عقرب', 'قوس', 'جدی', 'دلو', 'حوت');
                $array[$type] = $key[$num - 1];
                break;

            case 'ff':
                $key = array('بهار', 'تابستان', 'پاییز', 'زمستان');
                $array[$type] = $key[(int)($num / 3.1)];
                break;

            case 'km':
                $key = array('فر', 'ار', 'خر', 'تی‍', 'مر', 'شه‍', 'مه‍', 'آب‍', 'آذ', 'دی', 'به‍', 'اس‍');
                $array[$type] = $key[$num - 1];
                break;

            case 'kh':
                $key = array('ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش');
                $array[$type] = $key[$num];
                break;

            default:
                $array[$type] = $num;
        }
    }
    return ($mod === '') ? $array : implode($mod, $array);
}


/**  Gregorian & Jalali (Hijri_Shamsi,Solar) Date Converter Functions
 * Author: JDF.SCR.IR =>> Download Full Version :  http://jdf.scr.ir/jdf
 * License: GNU/LGPL _ Open Source & Free :: Version: 2.80 : [2020=1399]
 * ---------------------------------------------------------------------
 * 355746=361590-5844 & 361590=(30*33*365)+(30*8) & 5844=(16*365)+(16/4)
 * 355666=355746-79-1 & 355668=355746-79+1 &  1595=605+990 &  605=621-16
 * 990=30*33 & 12053=(365*33)+(32/4) & 36524=(365*100)+(100/4)-(100/100)
 * 1461=(365*4)+(4/4) & 146097=(365*400)+(400/4)-(400/100)+(400/400)  */

/*	F	*/
function gregorian_to_jalali($gy, $gm, $gd, $mod = '')
{
    list($gy, $gm, $gd) = explode('_', tr_num($gy . '_' . $gm . '_' . $gd));/* <= Extra :اين سطر ، جزء تابع اصلي نيست */
    $g_d_m = array(0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334);
    $gy2 = ($gm > 2) ? ($gy + 1) : $gy;
    $days = 355666 + (365 * $gy) + ((int)(($gy2 + 3) / 4)) - ((int)(($gy2 + 99) / 100)) + ((int)(($gy2 + 399) / 400)) + $gd + $g_d_m[$gm - 1];
    $jy = -1595 + (33 * ((int)($days / 12053)));
    $days %= 12053;
    $jy += 4 * ((int)($days / 1461));
    $days %= 1461;
    if ($days > 365) {
        $jy += (int)(($days - 1) / 365);
        $days = ($days - 1) % 365;
    }
    if ($days < 186) {
        $jm = 1 + (int)($days / 31);
        $jd = 1 + ($days % 31);
    } else {
        $jm = 7 + (int)(($days - 186) / 30);
        $jd = 1 + (($days - 186) % 30);
    }
    return ($mod == '') ? array($jy, $jm, $jd) : $jy . $mod . $jm . $mod . $jd;
}

/*	F	*/
function jalali_to_gregorian($jy, $jm, $jd, $mod = '')
{
    list($jy, $jm, $jd) = explode('_', tr_num($jy . '_' . $jm . '_' . $jd));/* <= Extra :اين سطر ، جزء تابع اصلي نيست */
    $jy += 1595;
    $days = -355668 + (365 * $jy) + (((int)($jy / 33)) * 8) + ((int)((($jy % 33) + 3) / 4)) + $jd + (($jm < 7) ? ($jm - 1) * 31 : (($jm - 7) * 30) + 186);
    $gy = 400 * ((int)($days / 146097));
    $days %= 146097;
    if ($days > 36524) {
        $gy += 100 * ((int)(--$days / 36524));
        $days %= 36524;
        if ($days >= 365) $days++;
    }
    $gy += 4 * ((int)($days / 1461));
    $days %= 1461;
    if ($days > 365) {
        $gy += (int)(($days - 1) / 365);
        $days = ($days - 1) % 365;
    }
    $gd = $days + 1;
    $sal_a = array(0, 31, (($gy % 4 == 0 and $gy % 100 != 0) or ($gy % 400 == 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    for ($gm = 0; $gm < 13 and $gd > $sal_a[$gm]; $gm++) $gd -= $sal_a[$gm];
    return ($mod == '') ? array($gy, $gm, $gd) : $gy . $mod . $gm . $mod . $gd;
}


function get_url($string)
{
    $url = str_replace('-', ' ', $string);
    $url = str_replace('/', ' ', $url);
    $url = preg_replace('/\s+/', '-', $url);
    return $url;
}

function uploade_file($request, $name, $directory, $pix = '')
{
    if ($request->hasFile($name)) {
        $file_name = $pix . time() . '.' . $request->file($name)->getClientoriginalExtension();
        if ($request->file($name)->move('files/' . $directory, $file_name)) {
            return $file_name;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

function replace_number($number)
{
    $number = str_replace("0", '۰', $number);
    $number = str_replace("1", '۱', $number);
    $number = str_replace("2", '۲', $number);
    $number = str_replace("3", '۳', $number);
    $number = str_replace("4", '۴', $number);
    $number = str_replace("5", '۵', $number);
    $number = str_replace("6", '۶', $number);
    $number = str_replace("7", '۷', $number);
    $number = str_replace("8", '۸', $number);
    $number = str_replace("9", '۹', $number);
    return $number;
}

function replace_number2($number)
{
    $number = str_replace("۰", '0', $number);
    $number = str_replace("۱", '1', $number);
    $number = str_replace("۲", '2', $number);
    $number = str_replace("۳", '3', $number);
    $number = str_replace("۴", '4', $number);
    $number = str_replace("۵", '5', $number);
    $number = str_replace("۶", '6', $number);
    $number = str_replace("۷", '7', $number);
    $number = str_replace("۸", '8', $number);
    $number = str_replace("۹", '9', $number);
    return $number;
}

function inTrashed($req)
{
    if (array_key_exists('trashed', $req) && ['trashed'] == true) {
        return true;
    } else {
        return false;
    }
}

function create_paginate_url($string, $text)
{
    if ($string == '?') {
        $string = $string . $text;
    } else {
        $string = $string . '&' . $text;
    }
    return $string;
}

function create_crud_route($route_param, $controller, $except = ['show'])
{
//    if ($except)
//    {
//        Route::resource($route_param,'Admin\\'.$controller);
//    }
//    else
//    {
//        Route::resource($route_param,'Admin\\'.$controller)->except($except);
//    }
    Route::resource($route_param, 'Admin\\' . $controller)->except($except);
    Route::post($route_param . '/remove_item', 'Admin\\' . $controller . '@remove_item')->name($route_param . '.destroy');
    Route::post($route_param . '/restore_item', 'Admin\\' . $controller . '@restore_item')->name($route_param . '.restore');
    Route::post($route_param . '/{id}', 'Admin\\' . $controller . '@restore')->name($route_param . '.restore');
}

function create_fit_pic($pic_url, $pic_name)
{
    $thumb = Image::make($pic_url);
    $thumb->resize(350, 350);
    $thumb->save(('files/thumb/' . $pic_name));
}

function remove_file($file_name, $directory)
{
    if (!empty($file_name) && file_exists('files/' . $directory . '/' . $file_name)) {
        unlink('files/' . $directory . '/' . $file_name);

    }

}

function add_min_product_price($warrenty)
{
    $v = verta();
    $year = $v->year;
    $month = $v->month;
    $day = $v->day;
    $has_row = DB::table('product_price')
        ->where(['Year' => $year, 'month' => $month, 'day' => $day,
            'color_id' => $warrenty->color_id, 'product_id' => $warrenty->product_id])->first();
    if ($has_row) {
        if ($warrenty->price2 < $has_row->price || $has_row->price == 0) {
            DB::table('product_price')
                ->where(['Year' => $year, 'month' => $month, 'day' => $day,
                    'color_id' => $warrenty->color_id, 'product_id' => $warrenty->product_id])
                ->update([
                    'price' => $warrenty->price2,
                    'warranty_id' => $warrenty->id

                ]);

        }

    } else {
        DB::table('product_price')
            ->insert(
                ['Year' => $year,
                    'month' => $month,
                    'day' => $day,
                    'color_id' => $warrenty->color_id,
                    'product_id' => $warrenty->product_id,
                    'price' => $warrenty->price2,
                    'time' => time(),
                    'warranty_id' => $warrenty->id

                ]
            );
    }
}

function update_product_price($product)
{
    $warrenty = ProductWarranty::where('product_id', $product->id)
        ->where('product_number', '>', 0)->orderBy('price2', 'asc')->first();

    $warrenty2 = ProductWarranty::where('product_id', $product->id)
        ->where('product_number', '>', 0)->orderBy('send_time', 'asc')->first();

    if ($warrenty) {
        $product->price = $warrenty->price2;
        if ($warrenty->price1 > $warrenty->price2) {
            $warrenty_price = $warrenty->price1 - $warrenty->price2;
            $product->discount_price = $warrenty_price;
        } else {
            $product->discount_price = 0;
        }

        $product->status = 1;
        $product->ready_to_shipment = $warrenty2->send_time;
        $product->update();
    } else {
        $product->discount_price = 0;
        $product->status = 0;
        $product->update();
    }
}

function check_has_product_warranty($warranty)
{
    $v = verta();
    $year = $v->year;
    $month = $v->month;
    $day = $v->day;
    $row = ProductWarranty::where(['product_id' => $warranty->product_id, 'color_id' => $warranty->color_id])
        ->where('product_number', '>', 0)
        ->orderBy('price2', 'ASC')->first();
    $price = $row ? $row->price2 : 0;
    $warranty_id = $row ? $row->id : 0;
    $has_row = ProductPriceModel::
    where(['Year' => $year, 'month' => $month, 'day' => $day,
        'color_id' => $warranty->color_id, 'product_id' => $warranty->product_id])->first();
    if ($has_row) {
        $has_row->price = $price;
        $has_row->warranty_id = $warranty_id;
        $has_row->update();
    } else {
        DB::table('product_price')
            ->insert(
                ['Year' => $year,
                    'month' => $month,
                    'day' => $day,
                    'color_id' => $warranty->color_id,
                    'product_id' => $warranty->product_id,
                    'price' => $price,
                    'time' => time(),
                    'warranty_id' => $warranty_id

                ]
            );
    }
}

function is_selected_value($list, $filter_id)
{
    $result = false;
    foreach ($list as $key => $value) {
        if ($value->filter_value == $filter_id) {
            $result = true;
        }
    }
    return $result;
}

function getFilterArray($list)
{
    $array = array();
    foreach ($list as $key => $value) {
        $array[$value->item_id] = $key;
    }
    return $array;
}

function getFilterItemValue($filter_id, $product_filters)
{
    $string = '';
    foreach ($product_filters as $key => $value) {
        if ($value == $filter_id) {
            $string .= '@' + $key;
        }
    }
    return $string;

}

function get_show_category_count($catList)
{
    $n = 0;
    foreach ($catList as $key => $value) {
        if ($value->notShow == 0) {
            $n++;
        }
    }
    return $n;
}

function getCatList()
{
    $data = cache('catList');
    if ($data) {
        View::share('catList', $data);
    } else {
        $category = CategoriesModel::with('getChild.getChild.getChild')->where('parent_id', 0)->get();
        $minutes = 30 * 24 * 60 * 60;
        cache()->put('catList', $category, $minutes);
        View::share('catList', $category);
    }

}

function get_cat_url($cat)
{
    if (!empty($cat->search_url)) {
        return url($cat->url);
    } else {
        return url('search/' . $cat->url);
    }
}

function getTimestamp($date, $type)
{

//    $jdf = new jdf();
    $time = 0;
    $e = explode('/', $date);
    if (sizeof($e) == 3) {
        $y = $e[0];
        $m = $e[1];
        $d = $e[2];

        if ($type == 'first') {
            $time = jmktime(0, 0, 0, $m, $d, $y);

        } else {
            $time = jmktime(23, 59, 59, $m, $d, $y);

        }

    }
    return $time;

}

function check_has_color_in_warranty_list($warranty_list, $color_id)
{
    $r = false;
    foreach ($warranty_list as $key => $value) {
        if ($value->color_id == $color_id) {
            $r = true;
        }
    }
    return $r;
}

function get_first_color_id($warranty_list, $color_id)
{
    if (sizeof($warranty_list) > 0) {
        if ($warranty_list[0]->color_id == $color_id) {
            return true;
        } else {
            return false;
        }
    }

}

function getCartProductData($products, $product_id)
{
    foreach ($products as $key => $value) {
        if ($value->id == $product_id) {
            return $value;
        }
    }
}

function getCartColorData($colors, $color_id)
{
    foreach ($colors as $key => $value) {
        if ($value->id == $color_id) {
            return $value;
        }
    }
}

function getCartWarrantyData($warranties, $warranty_id)
{
    foreach ($warranties as $key => $value) {
        if ($value->id == $warranty_id) {
            return $value;
        }
    }
}

function set_order_product_status($orderInfo, $status)
{

    $products_id = $orderInfo->product_id;
    $colors_id = $orderInfo->colors_id;
    $warranty_id = $orderInfo->warranty_id;
    $products_id = explode("-", $products_id);
    $colors_id = explode("-", $colors_id);
    $warranty_id = explode("-", $warranty_id);
    foreach ($products_id as $key => $value) {
        if (!empty($value)) {
            DB::table('order_products')
                ->where(['order_id' => $orderInfo->order_id, 'product_id' => $value, 'color_id' => $colors_id[$key], 'warranty_id' => $warranty_id[$key]])
                ->update(['send_status' => $status]);
        }
    }
}

function getOrderProductCount($products_id)
{
    $e = explode('-', $products_id);
    return sizeof($e);
}

function CheckGiftCart($product, $user_id, $credit_cart, $order_id)
{
    if ($product->use_for_gift_cart == 'yes') {
        $code = 'shopGift-' . rand(99, 999) . $user_id . rand(9, 99);
        $gift_cart = new GiftCart();
        $gift_cart->user_id = $user_id;
        $gift_cart->order_id = $order_id;
        $gift_cart->credit_cart = $credit_cart;
        $gift_cart->credit_used = 0;
        $gift_cart->code = $code;
        $gift_cart->save();


    }
}

function set_cat_brand($product, $oldData)
{
    if ($oldData) {
//            if ($oldData->cat_id!=$product->cat_id)
//            {
//                 check_has_cat_brand($product->cat_id,$product->brand_id);
//                remove_cat_brand($oldData['cat_id'],$oldData['brand_id']);
//
//            }
//            elseif ($oldData->brand_id!=$product->brand_id)
//            {
//                 check_has_cat_brand($product->cat_id,$product->brand_id);
//                remove_cat_brand($oldData['cat_id'],$oldData['brand_id']);
//            }


        if ($oldData['cat_id'] != $product->cat_id) {

            check_has_cat_brand($product->cat_id, $product->brand_id);
            remove_cat_brand($oldData['cat_id'], $oldData['brand_id']);
        } elseif ($oldData['brand_id'] != $product->brand_id) {

            check_has_cat_brand($product->cat_id, $product->brand_id);
            remove_cat_brand($oldData['cat_id'], $oldData['brand_id']);
        }
    } else {

        check_has_cat_brand($product->cat_id, $product->brand_id);
    }
}

function add_cat_brand($cat_id, $brand_id)
{

    $CatBrand = new CatBrand();
    $CatBrand->product_count = 1;
    $CatBrand->cat_id = $cat_id;
    $CatBrand->brand_id = $brand_id;
    $CatBrand->save();

}

function check_has_cat_brand($cat_id, $brand_id)
{
    $row = CatBrand::where(['cat_id' => $cat_id, 'brand_id' => $brand_id])->first();
    if ($row) {
        $product_count = $row->product_count + 1;
        $row->product_count = $product_count;
        $row->update();
    } else {
        add_cat_brand($cat_id, $brand_id);
    }
}

function remove_cat_brand($cat_id, $brand_id)
{
    $row = CatBrand::where(['cat_id' => $cat_id, 'brand_id' => $brand_id])->first();
    if ($row && $row->product_count > 1) {
        $product_count = $row->product_count - 1;
        $row->product_count = $product_count;
        $row->update();
    } else {
        if ($row) {
            $row->delete();
        }
    }
}

function get_compare_product_id($data)
{
    $array = array();
    $i = 0;
    if (is_array($data)) {
        foreach ($data as $key => $value) {
            if (!empty($value)) {
                $array[$i] = str_replace('dkp-', '', $value);
                $i++;
            }
        }
    }
    return $array;
}

function get_item_value($key, $products, $item_id)
{
    $string = '';
    if (sizeof($products) > $key) {
        foreach ($products[$key]->getItemValue as $item) {
            if ($item_id == $item->item_id) {
                $string .= $item->item_value . '<br>';
            }
        }
    }
    return $string;
}

function getCommentItem($array)
{
    $string = '';
    foreach ($array as $key => $value) {
        $string .= $value . '|[@#]|';
    }
    return $string;
}

function getCommentOrderId($product_id, $user_id)
{
    define('product_id', $product_id);
    $order_id = 0;
    $order = \App\Order::whereHas('getOrderProduct', function (\Illuminate\Database\Eloquent\Builder $query) {
        $query->where('product_id', product_id);
    })->where(['user_id' => $user_id, 'pay_status' => 'ok'])->select('id')->first();
    return $order;
}

function addScore($array_score, $comment_id, $product_id)
{
    if (sizeof($array_score) == 6) {
        $commentScore = new \App\CommentScore();
        $commentScore->product_id = $product_id;
        $commentScore->comment_id = $comment_id;
        $commentScore->score1 = $array_score[0];
        $commentScore->score2 = $array_score[1];
        $commentScore->score3 = $array_score[2];
        $commentScore->score4 = $array_score[3];
        $commentScore->score5 = $array_score[4];
        $commentScore->score6 = $array_score[5];
        $commentScore->saveOrFail();

    }
}

function getScoreItem($score, $scoreType)
{

    $score = [
        ['label' => ' کیفیت ساخت :', 'value' => $score->score1, 'type' => getScoreType($score->score1, $scoreType)],
        ['label' => ' نوآوری :', 'value' => $score->score2, 'type' => getScoreType($score->score2, $scoreType)],
        ['label' => ' سهولت استفاده :', 'value' => $score->score3, 'type' => getScoreType($score->score3, $scoreType)],
        ['label' => ' ارزش خرید به نسبت قیمت :', 'value' => $score->score4, 'type' => getScoreType($score->score4, $scoreType)],
        ['label' => ' امکانات و قابلیت ها :', 'value' => $score->score5, 'type' => getScoreType($score->score5, $scoreType)],
        ['label' => ' سهولت طراحی و ظاهر :', 'value' => $score->score6, 'type' => getScoreType($score->score6, $scoreType)],
    ];
    return $score;
}

function getScoreType($score, $scoreType)
{
    if (array_key_exists($score, $scoreType)) {
        return $scoreType[$score];
    } else {
        return '';
    }
}

function get_product_price_changed($product_id)
{
    $array = array();
    $points = [];
    $jdf = new jdf();

    $productColor = ProductColorModel::with('getColor')->where('product_id', $product_id)->get();
    $timeStamp = strtotime('-30 day');

    $product_price = ProductPriceModel::with(['getColor'])
        ->with(['getProductWarranty' => function ($query) {
            $query->withTrashed();
        }])
        ->where('product_id', $product_id)
        ->where('time', '>=', $timeStamp)
        ->get();

    $warranty_price = [];
    $price = [];
    $seller = [];
    $color = [];
    $zone = [];

    foreach ($product_price as $key => $value) {
        $date = $jdf->tr_num($jdf->jdate('Y/n/j', $value->time));
        $warranty_price[$date][$value->color_id] = $value->price;
        $seller[$date][$value->color_id] = 'حمیدرضا سمیعی';
    }

    for ($i = 30; $i >= 0; $i--) {
        $timeStamp = strtotime('-' . $i . ' day');
        $date = $jdf->tr_num($jdf->jdate('Y/n/j', $timeStamp));
        if (array_key_exists($date, $warranty_price)) {
            foreach ($productColor as $key => $value) {
                $size = array_key_exists($value->color_id, $price) ? sizeof($price[$value->color_id]) : 0;
                $points[$date] = $date;
                if (array_key_exists($value->color_id, $warranty_price[$date])) {
                    $color[$value->color_id] = ['name' => $value->getColor->name, 'code' => $value->getColor->code, 'id' => $value->getColor->id];
                    $price[$value->color_id][$size]['y'] = $warranty_price[$date][$value->color_id];
                    if ($warranty_price[$date][$value->color_id] == 0) {
                        $price[$value->color_id][$size]['y'] = $price[$value->color_id][($size - 1)]['y'];
                        $price[$value->color_id][$size]['price'] = 0;
                        $price[$value->color_id][$size]['has_product'] = 'no';
                        $price[$value->color_id][$size]['color'] = 'gray';

                        $zone_size = array_key_exists($value->color_id, $zone) ? sizeof($zone[$value->color_id]) : 0;
                        $zone[$value->color_id][$zone_size] = ['value' => $size];

                        if (sizeof($zone[$value->color_id]) == 1 && $i == 0) {
                            $zone[$value->color_id][($zone_size + 1)]['value'] = $zone[$value->color_id][$zone_size]['value'];
                            $zone[$value->color_id][($zone_size + 1)]['color'] = 'gray';
                        }
                    } else {
                        $price[$value->color_id][$size]['price'] = $warranty_price[$date][$value->color_id];
                        $price[$value->color_id][$size]['has_product'] = 'ok';
                        $price[$value->color_id][$size]['color'] = '#00bfd6';
                        $price[$value->color_id][$size]['seller'] = 'حمیدرضا سمیعی';

                        if (array_key_exists($value->color_id, $zone)) {
                            $first = sizeof($zone[$value->color_id]) - 1;
                            $end = $zone[$value->color_id][$first];

                            if ($price[$value->color_id][$size - 1]['price'] == 0) {
                                $zone[$value->color_id][sizeof($zone[$value->color_id])] = ['value' => $zone, 'color' => 'gray'];
                            }
                        }

                    }
                } else {
                    if (array_key_exists($value->color_id, $price) && array_key_exists(($size - 1), $price[$value->color_id])) {
                        $color[$value->color_id] = ['name' => $value->getColor->name, 'code' => $value->getColor->code, 'id' => $value->getColor->id];

                        if ($price[$value->color_id][$size - 1]['price'] == 0) {
                            $price[$value->color_id][$size]['y'] = $price[$value->color_id][($size - 1)]['y'];
                            $price[$value->color_id][$size]['price'] = 0;
                            $price[$value->color_id][$size]['has_product'] = 'no';
                            $price[$value->color_id][$size]['color'] = 'gray';

                            $zone_size = array_key_exists($value->color_id, $zone) ? sizeof($zone[$value->color_id]) : 0;
                            $zone[$value->color_id][$zone_size] = ['value' => $size, 'color' => 'gray'];
                        } else {
                            $price[$value->color_id][$size]['y'] = $price[$value->color_id][$size - 1]['y'];
                            $price[$value->color_id][$size]['price'] = $price[$value->color_id][$size - 1]['price'];
                            $price[$value->color_id][$size]['has_product'] = 'ok';
                            $price[$value->color_id][$size]['color'] = '#00bfd6';
                            $price[$value->color_id][$size]['seller'] = 'حمیدرضا سمیعی';


                            if (array_key_exists($value->color_id, $zone)) {
                                $first = sizeof($zone[$value->color_id]) - 1;
                                $end = $zone[$value->color_id][$first];

                                if ($price[$value->color_id][$size - 1]['price'] == 0) {
                                    $zone[$value->color_id][sizeof($zone[$value->color_id])] = ['value' => $zone, 'color' => 'gray'];
                                }
                            }


                        }
                    }
                }

            }
        } else if (sizeof($price)) {
            $points[$date] = $date;
            foreach ($productColor as $key => $value) {
                $size = array_key_exists($value->color_id, $price) ? sizeof($price[$value->color_id]) : 0;
                if (array_key_exists($value->color_id, $price) && array_key_exists(($size - 1), $price[$value->color_id])) {
                    $color[$value->color_id] = ['name' => $value->getColor->name, 'code' => $value->getColor->code, 'id' => $value->getColor->id];

                    if ($price[$value->color_id][$size - 1]['price'] == 0) {
                        $price[$value->color_id][$size]['y'] = $price[$value->color_id][($size - 1)]['y'];
                        $price[$value->color_id][$size]['price'] = 0;
                        $price[$value->color_id][$size]['has_product'] = 'no';
                        $price[$value->color_id][$size]['color'] = 'gray';

                        if (array_key_exists($value->color_id, $zone)) {
                            $first = sizeof($zone[$value->color_id]) - 1;
                            $end = $zone[$value->color_id][$first];

                            if ($price[$value->color_id][$size - 1]['price'] == 0) {
                                $zone[$value->color_id][sizeof($zone[$value->color_id])] = ['value' => $zone, 'color' => 'gray'];
                            }
                        }
                    } else {
                        $price[$value->color_id][$size]['y'] = $price[$value->color_id][$size - 1]['y'];
                        $price[$value->color_id][$size]['price'] = $price[$value->color_id][$size - 1]['price'];
                        $price[$value->color_id][$size]['has_product'] = 'ok';
                        $price[$value->color_id][$size]['color'] = '#00bfd6';
                        $price[$value->color_id][$size]['seller'] = 'حمیدرضا سمیعی';
                    }
                }

            }
        }
    }

    $i = 0;
    foreach ($points as $key => $value) {
        $points[$i] = $value;
        unset($points[$key]);
        $i++;
    }

    $j = 0;
    foreach ($price as $key => $value) {
        $price[$j] = $value;
        unset($price[$key]);
        $j++;
    }

    $k = 0;
    foreach ($color as $key => $value) {
        $color[$k] = $value;
        unset($color[$key]);
        $k++;
    }

    $array['price'] = $price;
    $array['points'] = $points;
    $array['color'] = $color;
    $array['zone'] = $zone;

    return $array;


}

function getUserPersonalData($additionalInfo, $attr1, $attr2 = null)
{
    $result = '-';
    if ($additionalInfo && !empty($additionalInfo->$attr1)) {
        $result = $additionalInfo->$attr1;
        if ($attr2) {
            $result .= ' ' . $additionalInfo->$attr2;
        }
    }
    return $result;
}

function getUserData($key, $additionalInfo)
{
    if (!empty(old($key))) {
        return old($key);
    } else {
        if ($key == 'mobile_phone') {
            return Auth::user()->mobile;
        } elseif ($additionalInfo && !empty($additionalInfo->$key)) {

            return $additionalInfo->$key;
        } else {
            return '';
        }
    }
}

function checkEvent($n)
{
    if ($n % 2 == 0) {
        return true;
    } else {
        return false;
    }
}

function addLike($request, $score_type)
{
    $table_name = $request->get('table_name', '');
    $row_id = $request->get('row_id', '');
    if ($table_name == 'comments' || $table_name == 'questions') {
        $row = DB::table($table_name)->where('id', $row_id)->first();
        if ($row) {
            $user_id = $request->user()->id;

            $user_scored_status = DB::table('user_scored_status')
                ->where(['user_id' => $user_id, 'row_id' => $row_id, 'score_type' => $score_type, 'type' => $table_name])
                ->first();
            if ($user_scored_status) {
                DB::table('user_scored_status')
                    ->where(['user_id' => $user_id, 'row_id' => $row_id, 'score_type' => $score_type, 'type' => $table_name])
                    ->delete();
                DB::table($table_name)->where('id', $row_id)->decrement($score_type, 1);
                return 'remove';
            } else {
                DB::table('user_scored_status')
                    ->insert([
                        'user_id' => $user_id,
                        'row_id' => $row_id,
                        'score_type' => $score_type,
                        'type' => $table_name
                    ]);
                DB::table($table_name)->where('id', $row_id)->increment($score_type, 1);
                return 'add';
            }

        } else {
            return 'error';
        }
    } else {
        return 'error';
    }

}

function CheckAccess($AccessList, $key, $key2)
{
    $result = false;
    if ($AccessList) {
        $access = json_decode($AccessList->access);
        if (is_object($access)) {
            if (property_exists($access, $key)) {
                if (is_array($access->$key)) {
                    foreach ($access->$key as $k => $v) {
                        if ($v == $key2) {
                            $result = true;
                        }
                    }
                }
            }
        }
    }
    return $result;
}

function checkUserAccess($access, $route, $AccessList)
{
    $result = false;
    $access = json_decode($access);
    if (is_object($access)) {
        foreach ($access as $key => $value) {
            if (array_key_exists($key, $AccessList)) {
                $userAccess = $AccessList[$key]['access'];
                foreach ($value as $key2 => $value2) {
                    if (array_key_exists($value2, $userAccess)) {
                        if (array_key_exists('routes', $userAccess[$value2])) {
                            foreach ($userAccess[$value2]['routes'] as $accessRoute) {
                                if ($accessRoute == $route) {
                                    $result = true;
                                }
                            }
                        }

                    }
                }
            }
        }
    }
    return $result;
}

function checkParentMenuAccess($accessList, $access)
{
    $result = false;
    if (Auth::user()->role == 'admin' && Auth::user()->account_status == 'active') {
        $result = true;
    } else {
        $accessList = json_decode($accessList);
        $e = explode('|', $access);
        if (sizeof($e) > 0 && is_object($accessList)) {
            foreach ($e as $key => $value) {
                if (!empty($value)) {
                    if (property_exists($accessList, $value)) {
                        $result = true;
                    }
                }
            }
        }
    }
    return $result;
}

function checkAddChildMenuAccess($accessList, $child)
{
    $result = false;
    if (Auth::user()->role == 'admin' && Auth::user()->account_status == 'active') {
        $result = true;
    } else {
        $accessList = json_decode($accessList);
        $property = $child['access'];
        if (is_object($accessList)) {
            if (property_exists($accessList, $property)) {
                if (is_array($accessList->$property)) {
                    if (!array_key_exists('accessValue', $child)) {
                        $result = true;
                    } else {
                        foreach ($accessList->$property as $key => $value) {
                            if ($value == $child['accessValue']) {
                                $result = true;
                            }
                        }
                    }

                }
            }
        }
    }
    return $result;
}

function get_stockroom_product_count($list)
{
    $n = 0;
    foreach ($list as $key => $value) {
        if (!empty($value)) {
            $e = explode('_', $value);
            if (sizeof($e) == 2) {
                $a = $e[1];
                settype($a, 'integer');
                $n += $a;
            }

        }
    }
    return $n;
}

function set_sale($order)
{
    if ($order)
    {
        $y = tr_num(jdate('Y'));
        $m = tr_num(jdate('n'));
        $d = tr_num(jdate('j'));
        $total_price = 0;
        $commission_price = 0;


        foreach ($order->getProductRow as $key => $value) {
            $cat_id = $value->getProduct->cat_id;
            $brand_id = $value->getProduct->brand_id;
            $c = 0;
            $product_price = $value->product_price2 * $value->product_count;
            if ($value->seller_id > 0) {
                $commision = \App\Commission::where(['cat_id' => $cat_id, 'brand_id' => $brand_id])->first();
                if ($commision) {
                    $c = ($value->product_price2 * $commision->percentage) / 100;
                    $c = ($c * $value->product_count);
                    $commission_price += $c;
                }

                DB::table('sellers')->where('id', $value->seller_id)->increment('new_order_count');
                DB::table('sellers')->where('id', $value->seller_id)->increment('total_commission', $c);
                DB::table('sellers')->where('id', $value->seller_id)->increment('total_price', $product_price);

                $value->commission = $c;
                $value->update();

                set_seller_sale_statistics($product_price, $c, $y, $m, $d, $value->seller_id);
            }
            $total_price += $product_price;
            product_sale_statistics($y, $m, $d, $c, $product_price, $value->product_id,$value->seller_id);
        }

        set_overall_statistics($y,$m,$d,$total_price,$commission_price);
    }
}

function product_sale_statistics($y, $m, $d, $commission, $product_price, $product_id, $type = 'plus')
{

    $product_sale = DB::table('product_sale_statistics')
        ->where(['year' => $y, 'month' => $m, 'day' => $d, 'product_id' => $product_id])
        ->first();
    if ($product_sale) {
        if ($type == 'plus') {
            $product_price = $product_price + $product_sale->price;
            $commission = $commission + $product_sale->commission;
        } else {
            $product_price = $product_sale->price - $product_price;
            $commission = $product_sale->commission - $commission;
        }

        DB::table('product_sale_statistics')
            ->where(['year' => $y, 'month' => $m, 'day' => $d, 'product_id' => $product_id])
            ->update([
                'price' => $product_price,
                'commission' => $commission
            ]);

    } else {
        if ($type == 'minus') {
            $commission = -$commission;
            $product_price = -$product_price;
        }
        DB::table('product_sale_statistics')
            ->insert([
                'year' => $y,
                'month' => $m,
                'day' => $d,
                'product_id' => $product_id,
                'commission' => $commission,
                'price' => $product_price
            ]);
    }
}

function set_seller_sale_statistics($product_price, $commission, $y, $m, $d, $seller_id,$type = 'plus')
{
    $seller_sale = DB::table('seller_sale_statistics')
        ->where(['year' => $y, 'month' => $m, 'day' => $d, 'seller_id' => $seller_id])
        ->first();
    if ($seller_sale) {
        if ($type == 'plus') {
            $product_price = $product_price + $seller_sale->price;
            $commission = $commission + $seller_sale->commission;
        } else {
            $product_price = $seller_sale->price - $product_price;
            $commission = $seller_sale->commission - $commission;
        }

        DB::table('seller_sale_statistics')
            ->where(['year' => $y, 'month' => $m, 'day' => $d, 'seller_id' => $seller_id])
            ->update([
                'price' => $product_price,
                'commission' => $commission
            ]);

    } else {
        if ($type == 'minus') {
            $commission = -$commission;
            $product_price = -$product_price;
        }
        DB::table('seller_sale_statistics')
            ->insert([
                'year' => $y,
                'month' => $m,
                'day' => $d,
                'seller_id' => $seller_id,
                'commission' => $commission,
                'price' => $product_price
            ]);
    }
}

function set_overall_statistics($y,$m,$d,$total_price,$commission,$type = 'plus')
{
    $sale_statistics = DB::table('sale_statistics')
        ->where(['year' => $y, 'month' => $m, 'day' => $d])
        ->first();
    if ($sale_statistics) {
        if ($type == 'plus') {
            $product_price = $total_price + $sale_statistics->price;
            $commission = $commission + $sale_statistics->commission;
        } else {
            $product_price = $sale_statistics->price - $total_price;
            $commission = $sale_statistics->commission - $commission;
        }

        DB::table('sale_statistics')
            ->where(['year' => $y, 'month' => $m, 'day' => $d])
            ->update([
                'price' => $product_price,
                'commission' => $commission
            ]);

    } else {
        if ($type == 'minus') {
            $commission = -$commission;
            $total_price = -$total_price;
        }
        DB::table('sale_statistics')
            ->insert([
                'year' => $y,
                'month' => $m,
                'day' => $d,
                'commission' => $commission,
                'price' => $total_price
            ]);
    }
}

function get_sale_report($request,$year,$table_name,$where,$attr,$now)
{
    $sale=[0=>0,1=>0,2=>0,3=>0,4=>0,5=>0,6=>0,7=>0,8=>0,9=>0,10=>0,11=>0,12=>0];
    $commission=[0=>0,1=>0,2=>0,3=>0,4=>0,5=>0,6=>0,7=>0,8=>0,9=>0,10=>0,11=>0,12=>0];
    $data=DB::table($table_name)->where($where)->get();
    foreach ($data as $key=>$value)
    {
        if (array_key_exists($value->month,$sale))
        {
            $sale[$value->month]+=$value->$attr;
        }
        if (array_key_exists($value->month,$commission))
        {
            $commission[$value->month]+=$value->commission;
        }
    }

    $first=DB::table($table_name)->first();
    $year_list=array();
    if ($first && $first->year!=$now)
    {
        $j=0;
        $a=$first->year;
        settype($a,'integer');
        for ($i=$a;$i<=$now;$i++)
        {
            $year_list[$j]=$i;
            $j++;
        }
    }
    else{
        $year_list[0]=$now;
    }
    $response=array();
    $response['sale']=$sale;
    $response['commission']=$commission;
    $response['default_year']=$year;
    $response['year_list']=$year_list;
    return $response;
}

function get_return_product_price($cat_id,$order_discount,$product_price)
{

    foreach ($order_discount as $key=>$value)
    {
        if ($value->cat_id==$cat_id)
        {
            $p=$value->total_price-$product_price;
            if ($p>$value->min_price)
            {
                if (!empty($value->amount_percent))
                {
                    $product_price-=(($product_price*$value->amount_percent)/100);
                }
                return $product_price;
            }
            else{
                return ($product_price-$value->discount_price);
            }
        }
        else if ($value->cat_id==0)
        {
            if ($value->cat_id==$cat_id) {
                $p = $value->total_price - $product_price;
                if ($p > $value->min_price) {
                    if (!empty($value->amount_percent))
                    {
                        $product_price-=(($product_price*$value->amount_percent)/100);
                    }
                    return $product_price;
                } else {
                    return ($product_price - $value->discount_price);
                }
            }
        }
    }

    if (sizeof($order_discount)==0)
    {
        return $product_price;
    }
}













