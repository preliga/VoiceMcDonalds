<?php

namespace resource\action\base;

use library\Pig\model\{
    Statement, View
};
use resource\action\Base;

/**
 * Created by PhpStorm.
 * User: Piotr
 * Date: 2017-11-29
 * Time: 21:09
 */
abstract class XmlAction extends Base
{
    /**
     *
     */
    public function init()
    {
        $this->statement = Statement::getInstance();
        $this->view = new class($this->file, 'vxml') extends View
        {
            public function assignVariableJs(array $data)
            {
            }
        };
    }

    /**
     *
     */
    public function render(){
        header('Content-type: application/xml; charset="utf-8"');
        parent::render();
    }
}