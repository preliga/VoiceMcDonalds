{*<script src="scripts/lib/record/recorder.js"></script>*}
{*<script src="scripts/lib/record/Fr.voice.js"></script>*}




<div class="bg-faded p-4 my-4" >
    <!-- Welcome Message -->
    <div class="text-center mt-4">
        <div class="text-heading text-muted text-lg">Welcome To McDonald's</div>
    </div>

    <div id="audioText"></div>

    <div class="row" style="text-align: center;">
        <div style="width: 50%;">
            <span>
                <i class="fa fa-home fa-5x" aria-hidden="true"></i>
                <br>
                <br>
                NA MIEJSCU
            </span>
        </div>
        <div style="width: 50%;">
            <span>
                <i class="fa fa-taxi fa-5x" aria-hidden="true"></i>
                <br>
                <br>
                NA DOWÓZ
            </span>
        </div>
    </div>
</div>

<div>
    <form id="form-vxml">
        <input name="type" />
    </form>
</div>

<div id="vxml" style="display: none;">
    <?xml version="1.0"?>
    <vxml version="2.0">
        <form>
            <block>
                <prompt>
                    Witaj świecie!
                </prompt>
            </block>
        </form>
    </vxml>
</div>