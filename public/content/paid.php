<?php

use resource\action\Base;
use \library\PigFramework\model\Session;

/**
 * Created by PhpStorm.
 * User: Piotr
 * Date: 2018-01-07
 * Time: 17:13
 */

class paid extends Base
{
    public function onAction()
    {
//        $shopCard = ['products' => [], 'priceSum' => 0];
//        Session::set('shopCard', $shopCard);
//        Session::set('type', null);

        $paid = $this->getParam('paid');
        if (empty($paid)) {
            $this->redirect();
        }

        $this->view->paid = $paid;
    }
}