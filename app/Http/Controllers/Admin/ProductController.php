<?php

namespace App\Http\Controllers\Admin;

use App\BrandsModel;
use App\CategoriesModel;
use App\ColorModel;
use App\FilterModel;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\ItemModel;
use App\ProductFilterModel;
use App\ProductGalleryModel;
use App\ProductsModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function PHPUnit\Framework\fileExists;

class ProductController extends CustomController
{
    protected $model='ProductsModel';
    protected $title='محصولات';
    protected $route_params='products';

    public function index(Request $request)
    {
        $product=ProductsModel::getData($request->all());
        $trash_count=ProductsModel::onlyTrashed()->count();
        return view('admin.product.index',['product'=>$product,'trash_count'=>$trash_count,'req'=>$request]);

    }


    public function create()
    {
        $colors=ColorModel::get();
        $brand['']='انتخاب برند';
        $brand=$brand+BrandsModel::pluck('brand_name','id')->toArray();
       $catList=(new CategoriesModel)->get_parent2();;
        return view('Admin.product.create',[
            'colors'=>$colors,
            'brand'=>$brand,
            'catList'=>$catList
        ]);
    }


    public function store(ProductRequest $request)
    {
        $use_for_gift_cart=$request->has('use_for_gift_cart') ? 'yes' : 'no';
        $product_color=$request->get('product_color',array());
        $product=new ProductsModel($request->all());
        $product_url=get_url($request->get('title'));
        $product->product_url=$product_url;
        $image_url=uploade_file($request,'pic','products');
        $product->image_url=$image_url;
        $product->use_for_gift_cart=$use_for_gift_cart;
        $product->view=0;
        create_fit_pic('files/products/'.$image_url,$image_url);
        $product->saveOrFail();
        foreach ($product_color as $key=>$value)
        {
            DB::table('product_color')->insert([
                'product_id'=>$product->id,
                'color_id'=>$value,
                'cat_id'=>$product->cat_id
            ]);
        }
        return redirect('admin/products')->with(['message'=>'ثبت محصول با موفقیت انجام شد','header'=>'ثبت محصول','alerts'=>'success']);

    }


    public function show($id)
    {
        //
    }


    public function edit($id)
    {
       $product=ProductsModel::findOrFail($id);
        $colors=ColorModel::get();
        $brand['']='انتخاب برند';
        $brand=$brand+BrandsModel::pluck('brand_name','id')->toArray();
        $catList=(new CategoriesModel)->get_parent2();
        $product_color=DB::table('product_color')->where('product_id',$product->id)->pluck('color_id','color_id')->toArray();
        return view('Admin.product.edit',[
            'colors'=>$colors,
            'brand'=>$brand,
            'catList'=>$catList,
            'product'=>$product,
            'product_color'=>$product_color
        ]);
    }


    public function update(Request $request, $id)
    {
        $data=$request->all();
        $use_for_gift_cart=$request->has('use_for_gift_cart') ? 'yes' : 'no';
        $product=ProductsModel::findOrFail($id);
        $product_color=$request->get('product_color',array());
        $product_url=get_url($request->get('title'));
        $product->product_url=$product_url;
        $data['use_for_gift_cart']=$use_for_gift_cart;
        $image_url=uploade_file($request,'pic','products');
        if (!empty($image_url)){

           remove_file($product->image_url,'products');
           remove_file($product->image_url,'thumb');
            create_fit_pic('files/products/'.$image_url,$image_url);
            $product->image_url=$image_url;
        }

        $product->update($data);
        DB::table('product_color')->where('product_id',$product->id)->delete();
        foreach ($product_color as $key=>$value)
        {
            DB::table('product_color')->insert([
                'product_id'=>$product->id,
                'color_id'=>$value,
                'cat_id'=>$product->cat_id
            ]);
        }

        return redirect('admin/products')
            ->with(['message'=>'ویرایش محصول با موفقیت انجام شد','header'=>'ویرایش محصول','alerts'=>'info']);


    }

    public function gallery($id){

        $product=ProductsModel::where('id',$id)->select(['id','title'])->firstorFail();
        $product_gallery=ProductGalleryModel::where('product_id',$id)->orderby('position','asc')->get();
        return view('Admin.product.gallery',['product'=>$product,'product_gallery'=>$product_gallery]);
    }

    public function gallery_upload($id,Request $request)
    {
        $product=ProductsModel::where('id',$id)->select(['id'])->firstorFail();
        if($product)
        {
            $count=DB::table('product_gallery')->where('product_id',$id)->count();
            $image_url=uploade_file($request,'file','gallery','image_'.$id.rand(1,100));
            if( $image_url!=null)
            {
                $count++;
                DB::table('product_gallery')->insert([
                    'product_id'=>$id,
                    'image_url'=>$image_url,
                    'position'=>$count

                ]);
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


    public function removeImageGallery($id)
    {
        $image=ProductGalleryModel::findOrfail($id);
        $image_url=$image->image_url;
        $image->delete();

        if(file_exists('files/gallery/'.$image_url))
        {
            unlink('files/gallery/'.$image_url);
        }
        return redirect()->back()->with(['message'=>'حذف تصویر با موفقیت انجام شد','header'=>'حذف تصویر','alerts'=>'error']);


    }


    public function change_images_status($id,Request $request)
    {
        sleep(2);
        $n=1;
        $parameters=$request->get('parameters');
         $parameters=explode(',',$parameters);
         foreach ($parameters as $key=>$value)
         {
             if (!empty($value))
             {
                 DB::table('product_gallery')->where('id',$value)->update(['position'=>$n]);

                 $n++;
             }
         }
    }

    public function items($id)
    {
        $product=ProductsModel::where('id',$id)->select(['id','title','cat_id'])->firstOrFail();
        $data=ItemModel::getProductItemWithFilter($product);
        $product_items=$data['items'];
        $filters=$data['filters'];
        $product_filters=ProductFilterModel::where('product_id',$product->id)->pluck('filter_id','filter_value')->toarray();
        return view('admin.product.items',['product'=>$product,'product_items'=>$product_items,'filters'=>$filters,'product_filters'=>$product_filters]);
    }

    public function add_items($id,Request $request)
    {

        $product=ProductsModel::where('id',$id)->select(['id','title','cat_id'])->firstOrFail();
        $items_value=$request->get('item_value');
        $filters_value=$request->get('filter_value');
        DB::table('item_value')->where(['product_id'=>$id])->delete();
        foreach ($items_value as $key=>$value)
        {
            foreach ($value as $key2=>$value2)
            {
                if (!empty($value2))
                {
                    DB::table('item_value')->insert([
                        'product_id'=>$id,
                        'item_id'=>$key,
                        'item_value'=>$value2
                    ]);
                }
            }
            ItemModel::addFilter($key,$filters_value,$id);
        }
        return redirect()->back()->with(['message'=>'ثبت مشخصات فنی برای محصول با موفقیت انجام شد','header'=>'مشخصات فنی ','alerts'=>'success']);

    }

    public function filters($id)
    {
        $product=ProductsModel::where('id',$id)->select(['id','title','cat_id'])->firstOrFail();
        $product_filters=FilterModel::getProductFilter($product);
        return view('admin.product.filters',['product'=>$product,'product_filters'=>$product_filters]);

    }

    public function add_filters($id,Request $request)
    {
        $product=ProductsModel::where('id',$id)->select(['id','title','cat_id'])->firstOrFail();
        $filter=$request->get('filter');
        DB::table('filter_product')->where(['product_id'=>$id])->delete();
        if (is_array($filter))
        {
            foreach ($filter as $key=>$value)
            {
                if (is_array($value))
                {
                    foreach ($value as $key2=>$value2)
                    {
                        DB::table('filter_product')->insert([
                           'product_id'=>$id,
                            'filter_id'=>$key,
                            'filter_value'=>$value2
                        ]);
                    }
                }
            }
        }
        return redirect()->back()->with(['message'=>'ثبت فیلتر برای محصول با موفقیت انجام شد','header'=>'ثبت فیلتر ','alerts'=>'success']);

    }







}
