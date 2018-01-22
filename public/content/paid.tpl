<div class="bg-faded p-4 my-4">

    <div style="text-align: center;">
        <h2>
            {if $paid == 'nie'}
                Reset zamówienia
            {/if}
            {if $paid == 'tak'}
                Zamówienie w trakcie realizacji.
            {/if}
        </h2>
    </div>

</div>



<div>
    <form id="form-vxml">
    </form>
</div>

<div id="vxml" style="display: none;">
	<?xml version="1.0"?>
	<vxml version="2.0">
		<form>
			<block>
				<prompt>Witaj</prompt>
			</block>
		</form>
	</vxml>
</div>