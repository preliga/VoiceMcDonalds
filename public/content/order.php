<?php

use resource\action\Base;
use library\PigFramework\model\Session;

class order extends Base
{
    public function onAction()
    {
        $type = Session::get('type');

        $this->view->type = $type;


        $shopCard = Session::get('shopCard');
        if (empty($shopCard)) {
            $shopCard = ['products' => [], 'priceSum' => 0];
            Session::set('shopCard', $shopCard);
        }

        $this->view->shopCard = $shopCard;

        $categories = $this->getCategories();
        $this->view->categories = $categories;


//        die(var_dump(Session::get('type')));

//        Session::set('type', null);
    }

    public function getCategories()
    {
        $sql = $this->db->select()
            ->from(['c' => 'category']);

        return $this->db->fetchAll($sql);
    }
}
