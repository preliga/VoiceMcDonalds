<script src="scripts/lib/record/recorder.js"></script>
<script src="scripts/lib/record/Fr.voice.js"></script>

    <div class="recorder" style="display: none">
        <i class="fa fa-microphone fa-4x" aria-hidden="true"></i>
    </div>


    <div class="bg-faded p-4 my-4">
        <!-- Welcome Message -->
        <div class="text-center mt-4">
            <div class="text-heading text-muted text-lg">Welcome To McDonald's</div>
        </div>

        <div id="audioText"></div>

        <button class="speechRecognition btn btn-success">speechRecognition</button>

        <br><br>
        <h2>Record <i class="fa fa-microphone" aria-hidden="true"></i></h2>
        {*<audio controls id="audio"></audio>*}
        {*<div>*}
            {*<a class="button recordButton" id="record">Record</a>*}
            {*<a class="button recordButton" id="recordFor5">Record For 5 Seconds</a>*}
            {*<a class="button disabled one" id="pause">Pause</a>*}
            {*<a class="button disabled one" id="stop">Reset</a>*}
        {*</div><br/>*}

        <canvas id="level" height="200" width="500"></canvas>
    </div>
</div>
<style>
    .button{
        display: inline-block;
        vertical-align: middle;
        margin: 0px 5px;
        padding: 5px 12px;
        cursor: pointer;
        outline: none;
        font-size: 13px;
        text-decoration: none !important;
        text-align: center;
        color:#fff;
        background-color: #4D90FE;
        background-image: linear-gradient(top,#4D90FE, #4787ED);
        background-image: -ms-linear-gradient(top,#4D90FE, #4787ED);
        background-image: -o-linear-gradient(top,#4D90FE, #4787ED);
        background-image: linear-gradient(top,#4D90FE, #4787ED);
        border: 1px solid #4787ED;
        box-shadow: 0 1px 3px #BFBFBF;
    }
    a.button{
        color: #fff;
    }
    .button:hover{
        box-shadow: inset 0px 1px 1px #8C8C8C;
    }
    .button.disabled{
        box-shadow:none;
        opacity:0.7;
    }
    canvas{
        display: block;
    }
</style>
