<?php

use resource\action\Base;
use library\PigFramework\model\Session;

class order extends Base
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

        $categories = $this->getCategories();
        $this->view->categories = $categories;

        $products = $this->getProducts();
        $this->view->products = $products;
    }

    public function getCategories()
    {
        $sql = $this->db->select()
            ->from(['c' => 'category']);

        return $this->db->fetchAll($sql);
    }

    public function getProducts()
    {
        $sql = $this->db->select()
            ->from(['p' => 'product']);

        return $this->db->fetchAll($sql);
    }
}
