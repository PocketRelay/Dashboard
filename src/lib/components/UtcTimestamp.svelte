<script lang="ts">
  import dayjs from "dayjs";

  export let timestamp: string;

  const userTimezone = dayjs.tz.guess();

  $: localDateTime = dayjs
    .utc(timestamp)
    // Convert UTC to local timezone
    .tz(userTimezone)
    // Format timestamp in local date time format
    .format("L LT");
</script>

{localDateTime}
