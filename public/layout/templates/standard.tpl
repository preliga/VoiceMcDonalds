<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>VoiceMcDonalds</title>
    {$scriptLoader->includeAllCSS()}

    {if file_exists("$file.css")}
        <link rel="stylesheet" href="/{$file}.css">
    {/if}

    {$scriptLoader->includeAllJS()}
</head>

<body>
<div class="tagline-upper text-center text-heading text-shadow text-white mt-5 d-none d-lg-block"
     onclick="window.location = '/'" style="cursor: pointer;">
    Voice McDonalds
</div>

<div class="page">
    {*<div class="container">*}

    <div id="loader" style="display: none">
        <ul id="loadbar">
            <li>
                <div id="block_1" class="barlittle"></div>
            </li>
            <li>
                <div id="block_2" class="barlittle"></div>
            </li>
            <li>
                <div id="block_3" class="barlittle"></div>
            </li>
            <li>
                <div id="block_4" class="barlittle"></div>
            </li>
            <li>
                <div id="block_5" class="barlittle"></div>
            </li>
        </ul>
    </div>

    {if file_exists("$file.tpl")}
        {include file="{$file}.tpl"}
    {/if}
</div>


{*<footer class="bg-faded text-center py-1" style="position:fixed; bottom:0; width: 100%;">*}
    {*<div class="container">*}
        {*<a href="/admin/login"> Admin panel</a>*}
    {*</div>*}
{*</footer>*}

<!-- App -->
<script data-main="/scripts/app/js/app" src="/scripts/lib/require.js"></script>

</body>

</html>
