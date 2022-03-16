import { TemplateHelper } from "@microsoft/mgt";

const channelPicker = document.querySelector("mgt-teams-channel-picker");
const channelMessages = document.getElementById("mgt-teams-channel-messages");

TemplateHelper.globalContext.currentTeamId = "";
TemplateHelper.globalContext.currentChannelId = "";

TemplateHelper.globalContext.formatDate = date => {
  let messageDate = new Date(date);
  let locale = "en-US";

  // Formatter for "Today" and "Yesterday" etc
  const relative = new Intl.RelativeTimeFormat(locale, {
    numeric: "always",
    hour: "numeric",
    minute: "numeric"
  });

  // Formatter for "Today" and "Yesterday" times
  const relativeTime = new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "numeric"
  });

  // Formatter for weekdays, e.g. "Monday"
  const short = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    hour: "numeric",
    minute: "numeric"
  });

  // Formatter for dates, e.g. "Mon, 31 May 2021"
  const long = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric"
  });

  let formattedDate = "nothing";

  console.log(formattedDate);

  const now = new Date().setHours(0, 0, 0, 0);
  const then = new Date(messageDate).setHours(0, 0, 0, 0);
  const days = Math.ceil((then - now) / 86400000);

  console.log(days);

  if (days > -6) {
    if (days > -2) {
      return `${relative.format(days, "day")}, ${relativeTime.format(
        messageDate
      )}`;
    }
    return short.format(messageDate);
  }
  return long.format(messageDate);
};

channelPicker.addEventListener("selectionChanged", e => {
  if (e.detail.length) {
    let channelId = e.detail[0].channel.id;
    let teamId = e.detail[0].team.id;
    TemplateHelper.globalContext.currentTeamId = teamId;
    TemplateHelper.globalContext.currentChannelId = channelId;
    channelMessages.resource = `teams/${teamId}/channels/${channelId}/messages/delta`;
    channelMessages.refresh(true);
    channelMessages.style.display = "block";
  } else {
    channelMessages.style.display = "none";
  }
});
