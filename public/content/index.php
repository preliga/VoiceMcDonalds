<?php

use resource\action\Base;
use library\PigFramework\model\Session;

class index extends Base
{
//    public function init()
//    {
//        parent::init();
//
//        $this->view->setTemplate('test');
//    }

    public function onAction()
    {
        if ($this->hasPost('type')) {
            Session::set('type', $this->getPost('type'));
        }

        if (!empty(Session::get('type'))) {
            $this->redirect("/order");
        }
    }
}
