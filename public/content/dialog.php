<?php

use resource\action\base\XmlAction;

/**
 * Created by PhpStorm.
 * User: Piotr
 * Date: 2017-11-29
 * Time: 22:16
 */

class dialog extends XmlAction
{
    public function init()
    {
        $this->file = "content/dialogs/". $this->getParam('file');
        parent::init();
    }

    public function onAction()
    {
    }
}
