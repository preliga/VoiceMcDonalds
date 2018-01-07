<?php

use library\PigFramework\model\Session;
use resource\action\Base;

/**
 * Created by PhpStorm.
 * User: Piotr
 * Date: 2018-01-07
 * Time: 18:28
 */

class acceptationOrder extends Base
{
    public function onAction()
    {
        $type = Session::get('type');
        if (empty($type)) {
            $this->redirect();
        }

        $this->view->type = $type;

        $shopCard = Session::get('shopCard');
        if (empty($shopCard)) {
            $shopCard = ['products' => [], 'priceSum' => 0];
            Session::set('shopCard', $shopCard);
        }

        $this->view->shopCard = $shopCard;
    }
}