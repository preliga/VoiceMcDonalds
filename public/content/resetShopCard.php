<?php

use resource\action\Base;
use \library\PigFramework\model\Session;

/**
 * Created by PhpStorm.
 * User: Piotr
 * Date: 2018-01-07
 * Time: 17:13
 */

class resetShopCard extends Base
{
    public function onAction()
    {
        $shopCard = ['products' => [], 'priceSum' => 0];
        Session::set('shopCard', $shopCard);
        Session::set('type', null);

        $this->redirect();
    }
}