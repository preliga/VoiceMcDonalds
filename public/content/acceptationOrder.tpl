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
            {if $type == 2}
                <grammar>
					<rule>
						<item>
							<one-of>
								<item>miodowa<tag>out.streetName="miodowa";</tag></item>
								<item>stalowa<tag>out.streetName="stalowa";</tag></item>
								<item>kacprzaka<tag>out.streetName="kacprzaka";</tag></item>
								
								<item>1<tag>out.streetNumber="1";</tag></item>
								<item>2<tag>out.streetNumber="2";</tag></item>
								<item>3<tag>out.streetNumber="3";</tag></item>
								<item>4<tag>out.streetNumber="4";</tag></item>
								<item>5<tag>out.streetNumber="5";</tag></item>
								<item>6<tag>out.streetNumber="6";</tag></item>
								<item>7<tag>out.streetNumber="7";</tag></item>
								<item>8<tag>out.streetNumber="8";</tag></item>
								<item>9<tag>out.streetNumber="9";</tag></item>
								<item>10<tag>out.streetNumber="10";</tag></item>
								
								<item>warszawa<tag>out.city="warszawa";</tag></item>
								<item>brwinów<tag>out.city="brwinów";</tag></item>
								<item>pruszków<tag>out.city="pruszków";</tag></item>
							</one-of>
						</item>
						
						<item repeat="0-1">
							<one-of>
								<item>miodowa<tag>out.streetName="miodowa";</tag></item>
								<item>stalowa<tag>out.streetName="stalowa";</tag></item>
								<item>kacprzaka<tag>out.streetName="kacprzaka";</tag></item>
								
								<item>1<tag>out.streetNumber="1";</tag></item>
								<item>2<tag>out.streetNumber="2";</tag></item>
								<item>3<tag>out.streetNumber="3";</tag></item>
								<item>4<tag>out.streetNumber="4";</tag></item>
								<item>5<tag>out.streetNumber="5";</tag></item>
								<item>6<tag>out.streetNumber="6";</tag></item>
								<item>7<tag>out.streetNumber="7";</tag></item>
								<item>8<tag>out.streetNumber="8";</tag></item>
								<item>9<tag>out.streetNumber="9";</tag></item>
								<item>10<tag>out.streetNumber="10";</tag></item>
								
								<item>warszawa<tag>out.city="warszawa";</tag></item>
								<item>brwinów<tag>out.city="brwinów";</tag></item>
								<item>pruszków<tag>out.city="pruszków";</tag></item>
							</one-of>
						</item>
						
						<item repeat="0-1">
							<one-of>
								<item>miodowa<tag>out.streetName="miodowa";</tag></item>
								<item>stalowa<tag>out.streetName="stalowa";</tag></item>
								<item>kacprzaka<tag>out.streetName="kacprzaka";</tag></item>
								
								<item>1<tag>out.streetNumber="1";</tag></item>
								<item>2<tag>out.streetNumber="2";</tag></item>
								<item>3<tag>out.streetNumber="3";</tag></item>
								<item>4<tag>out.streetNumber="4";</tag></item>
								<item>5<tag>out.streetNumber="5";</tag></item>
								<item>6<tag>out.streetNumber="6";</tag></item>
								<item>7<tag>out.streetNumber="7";</tag></item>
								<item>8<tag>out.streetNumber="8";</tag></item>
								<item>9<tag>out.streetNumber="9";</tag></item>
								<item>10<tag>out.streetNumber="10";</tag></item>
								
								<item>warszawa<tag>out.city="warszawa";</tag></item>
								<item>brwinów<tag>out.city="brwinów";</tag></item>
								<item>pruszków<tag>out.city="pruszków";</tag></item>
							</one-of>
						</item>
					</rule>
                </grammar>

                <initial>
                    <prompt>Podaj adres</prompt>
                </initial>
				
                <field name="streetName">
                    <prompt>Podaj nazwę ulicy</prompt>
					<grammar>[miodowa|stalowa|kacprzaka]</grammar>
                </field>
				
				<field name="streetNumber">
                    <prompt>Podaj numer domu</prompt>
					<grammar>[1|2|3|4|5|6|7|8|9|10]</grammar>
                </field>

                <field name="city">
                    <prompt>Podaj miasto</prompt>
					<grammar>[warszawa|brwinów|pruszków]</grammar>
                </field>
            {/if}
			
			<field name="paid">
				<prompt>Czy zapłaciłeś?</prompt>
				<grammar>[tak|nie]</grammar>
			</field>
			
			<subdialog name="paid" src="/paid">
				<params name="paid" expr="paid"/>
			</subdialog>
			
		</form>
	</vxml>
</div>