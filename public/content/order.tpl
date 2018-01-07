<div class="bg-faded p-4 my-4">

    <div class="container">
        <h2>Koszyk</h2>
        <table class="table table-hover shopCard">
            <thead>
            <tr>
                <th>Nazwa</th>
                <th>Ilość</th>
                <th>Cena</th>
            </tr>
            </thead>
            <tbody>
            {foreach $shopCard['products'] as $product}
                <tr>
                    <td>{$product['name']}</td>
                    <td>{$product['amount']}</td>
                    <td>{$product['price']}</td>
                </tr>
            {/foreach}
            <tr>
                <td colspan="2" align="right">Suma</td>
                <td id="priceSum">{if $type == 2}{$shopCard['priceSum'] + 5} (5zł dostawa){else} {$shopCard['priceSum']} {/if}</td>
            </tr>
            </tbody>
        </table>
    </div>

    <hr class="HRStyle">

    <h2>Kategorie</h2>
    <div class="row" style="text-align: center;">
        {assign var="x" value="100"}
        {foreach $categories as $category}
            <div style="width: {$x / count($categories)}%;">
                <span>
                    <img style="margin: 10px;" src="{$category['picture']}" width="250" height="200"/>
                    <br>
                    <br>
                    {$category['name']}
                </span>
            </div>
        {/foreach}
    </div>

    <br><br>
    {foreach $categories as $category}
        <div class="{$category['name']}" style="display: none;">
            <h2>{$category['name']}</h2>
            <div class="row" style="text-align: center;">
                {foreach $products as $product}
                    {if $product['categoryId'] == $category['id']}
                        <div style="width: 33%;">
                            <span>
                                <img style="margin: 10px;" src="{$product['picture']}" height="200"/>
                                <br>
                                <br>
                                {$product['name']}
                                <br>
                                {$product['price']} zł
                            </span>
                        </div>
                    {/if}
                {/foreach}
            </div>
            <br><br>
        </div>
    {/foreach}


    <div class="amount" style="text-align: center; display: none">
        <h1> Ile? </h1>
    </div>

    <div class="acceptOrder" style="text-align: center; display: none;">
        <h1> Twoje zamówienie: </h1>
        <div class="orderProduct"></div>
    </div>

    <div class="again" style="text-align: center; display: none;">
        <h1> Kolejny produkt? </h1>
    </div>

</div>

<div>
    <form id="form-vxml">
        <input name="category" placeholder="category"/>
        <input name="product" placeholder="product"/>
        <input name="amount" placeholder="amount"/>
        <input name="accept" placeholder="accept"/>
        <input name="again" placeholder="again"/>
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