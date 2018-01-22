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
        $paramsJSON = $this->getParam('params');

        $params = json_decode($paramsJSON, true);

        $this->view->paid = $params['paid'];
    }
}