<div class="bg-faded p-4 my-4">

    <div class="container">
        <h2>Twoje zamówienie</h2>
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

    {if $type == 2}
        <div class="address" style="text-align: center;">
            <h2>Podaj adres</h2>
        </div>

        <div class="yourAddress" style="text-align: center; display: none;">
            {*<h3>Twój adres:</h3>*}
            {*<p class="yourAddress">Gołuchowska 2, Warszawa</p>*}
        </div>
    {/if}

    <div class="paid" style="text-align: center; {if $type == 2} display: none; {/if}">
        <h2>Płacisz?</h2>
    </div>
</div>



<div>
    <form id="form-vxml">
        {if $type == 2}
            <input name="streetNumber" placeholder="streetNumber"/>
            <input name="streetName" placeholder="streetName"/>
            <input name="city" placeholder="city"/>
        {/if}
        <input name="paid" placeholder="paid"/>
    </form>
</div>

<div id="vxml" style="display: none;">
	<?xml version="1.0"?>
	<vxml version="2.0">
		<form>
			<block>
				<prompt>Witaj świecie!</prompt>
			</block>



            {if $type == 2}
                <grammar>
                </grammar>

                <initial>
                    <prompt>Podaj adres</prompt>
                </initial>

                <field name="streetNumber">
                    <prompt>Podaj numer domu</prompt>
                    <grammar>[1|2|3|4|5|6|7|8|9|10]</grammar>
                </field>

                <field name="streetName">
                    <prompt>Podaj nazwę ulicy</prompt>
                    <grammar>[Miodowa|Złota|Marszałkowska]</grammar>
                </field>

                <field name="city">
                    <prompt>Podaj miasto</prompt>
                    <grammar>[Warszawa|Brwinów|Pruszków]</grammar>
                </field>
            {/if}
			<field name="paid">
				<prompt>Czy zapłaciłeś?</prompt>
				<grammar>[tak|nie]</grammar>
			</field>
			
			<block>
				<if cond="paid==tak">
					<goto next="paid"/>
				</if>
			</block>
			
			<subdialog name="order" src="/paid?paid=nie"/>
		</form>
		
		<form id="paid">
			<subdialog name="order" src="/paid?paid=tak"/>
		</form>
	</vxml>
</div>