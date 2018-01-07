<?php

use resource\action\Base;
use \library\PigFramework\model\Session;

/**
 * Created by PhpStorm.
 * User: Piotr
 * Date: 2018-01-07
 * Time: 17:13
 */

class addProduct extends Base
{
    public function onAction()
    {
        $productId = $this->getParam('productId');
        $amount = $this->getParam('amount');

        if (empty($productId)) {
            $this->redirect("/", [], false, 'Invalid params. Expect [productId, amount]');
        }

        $product = $this->getProduct($productId);
        $product['amount'] = $amount;

        $shopCard = Session::get('shopCard');
        array_unshift($shopCard['products'], $product);

        $shopCard['priceSum'] += (real)$product['price'] * (real)$amount;
        Session::set('shopCard', $shopCard);

        $this->view->shopCard = $shopCard;
    }

    public function getProduct($productId) {
        $sql = $this->db->select()
            ->from(['p' => 'product'])
            ->where('id = ?', $productId);

        return $this->db->fetchRow($sql);
    }
}