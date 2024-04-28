<script lang="ts">
  import DashboardPage from "$lib/components/DashboardPage.svelte";
  import BasicInformationForm from "$lib/components/settings/BasicInformationForm.svelte";
  import ChangePasswordForm from "$lib/components/settings/ChangePasswordForm.svelte";
  import DeleteAccountForm from "$lib/components/settings/DeleteAccountForm.svelte";
</script>

<DashboardPage title="Settings" text="Edit the settings for your account below">
  <div class="forms">
    <BasicInformationForm />
    <ChangePasswordForm />
    <DeleteAccountForm />
  </div>
</DashboardPage>
