<script lang="ts">
  import BasicInformationForm from "$lib/components/settings/BasicInformationForm.svelte";
  import ChangePasswordForm from "$lib/components/settings/ChangePasswordForm.svelte";
  import DeleteAccountForm from "$lib/components/settings/DeleteAccountForm.svelte";
  import PageHeading from "$lib/components/PageHeading.svelte";
</script>

<PageHeading title="Settings" text="Edit the settings for your account below" />

<div class="forms">
  <BasicInformationForm />
  <ChangePasswordForm />
  <DeleteAccountForm />
</div>
