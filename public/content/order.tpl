


<div class="bg-faded p-4 my-4" >

    <div class="container">
        <h2>Koszyk</h2>
        <table class="table table-hover">
            <thead>
            <tr>
                <th>Lp.</th>
                <th>Nazwa</th>
                <th>Ilość</th>
                <th>Cena</th>
            </tr>
            </thead>
            <tbody>
            {assign var="i" value="1"}
            {foreach $shopCard['products'] as $product}
                <tr>
                    <td>{$i++}</td>
                    <td>{$product['name']}</td>
                    <td>{$product['amount']}</td>
                    <td>{$product['price']}</td>
                </tr>
            {/foreach}
            <tr>
                <td colspan="3" align="right">Suma {if $type == 2} + 5zł Dostawa{/if}</td>
                <td>{if $type == 2}{$shopCard['priceSum'] + 5}{else} {$shopCard['priceSum']} {/if}</td>
            </tr>
            </tbody>
        </table>
    </div>

    <hr class="HRStyle">

    <div class="row" style="text-align: center;">

        {foreach $categories as $category}
            <div style="width: 33%;">
            <span>
                <img style="margin: 10px;" src="{$category['picture']}" width="250"  height="200"/>
                {*<i class="fa fa-home fa-5x" aria-hidden="true"></i>*}
                <br>
                <br>
                {$category['name']}
            </span>
            </div>
        {/foreach}
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