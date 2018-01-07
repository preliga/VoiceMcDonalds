<?php

use resource\action\Base;
use library\PigFramework\model\Session;

/**
 * Created by PhpStorm.
 * User: Piotr
 * Date: 2018-01-07
 * Time: 16:39
 */

class setType extends Base
{
    public function onAction()
    {
        if ($this->getParam('type')) {
            Session::set('type', $this->getParam('type'));
        }
    }
}