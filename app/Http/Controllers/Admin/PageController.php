<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Page;
use Illuminate\Http\Request;

class PageController extends CustomController
{
    protected $model = 'Page';
    protected $title = 'صفحه';
    protected $route_params = 'pages';

    public function index(Request $request)
    {
        $pages = Page::getData($request->all());
        $trash_count = Page::onlyTrashed()->count();
        return view('admin.pages.index', ['pages' => $pages, 'trash_count' => $trash_count, 'req' => $request]);

    }

    public function create()
    {
        return view('Admin.pages.create');
    }

    public function store(Request $request)
    {
        $this->validate($request, ['title' => ['required','unique:pages'], 'content' => 'required'], [], ['title' => 'عنوان صفحه', 'content' => 'محتوای صفحه']);
        $page = new Page($request->all());
        $page_url = get_url($request->get('title'));
        $page->url = $page_url;
        $page->saveOrFail();
        return redirect('admin/pages')->with(['message' => 'ثبت صفحه با موفقیت انجام شد', 'header' => 'ثبت صفحه', 'alerts' => 'success']);

    }

    public function edit($id)
    {
        $page = Page::findOrFail($id);
        return view('Admin.pages.edit',['page'=>$page]);
    }

    public function update(Request $request, $id)
    {
        $page = Page::findOrFail($id);
        $this->validate($request, ['title' => ['required','unique:pages,title,'.$id.''], 'content' => 'required'], [], ['title' => 'عنوان صفحه', 'content' => 'محتوای صفحه']);
        $page_url = get_url($request->get('title'));
        $page->url = $page_url;
        $page->update($request->all());
        return redirect('admin/pages')->with(['message' => 'ویرایش صفحه با موفقیت انجام شد', 'header' => 'ویرایش صفحه', 'alerts' => 'success']);
    }

}
