<?php

use Google\Cloud\Storage\StorageClient;
use Google\Cloud\Speech\SpeechClient;
use library\Pig\model\Config;
use resource\action\Base;

/**
 * Created by PhpStorm.
 * User: Piotr
 * Date: 2017-11-25
 * Time: 22:08
 */
class speechRecognition extends Base
{
    public function onAction()
    {
        $audio = $this->getPost('audio');

//        file_put_contents('../files/audio/test.wav', base64_decode(substr($audio,22)));

//        $file = file_get_contents('../files/audio/test.wav');

        # Instantiates a client
        $speech = new SpeechClient(Config::getInstance()->getConfig('googleProject'));

        # The name of the audio file to transcribe
        # The audio file's encoding and sample rate
        $options = [
            'encoding' => 'LINEAR16',
        ];


        $file = base64_decode(substr($audio,22));

        $results = $speech->recognize($file, $options);

        $speechRecognition = [];
        foreach ($results as $result) {
            $speechRecognition[] = $result->alternatives()[0]['transcript'];
        }

        $this->view->speechRecognition = $speechRecognition;
    }
}