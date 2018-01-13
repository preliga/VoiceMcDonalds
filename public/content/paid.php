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
        $paid = $this->getParam('paid');
        if (empty($paid)) {
            $this->redirect();
        }

        $this->view->paid = $paid;
    }
}