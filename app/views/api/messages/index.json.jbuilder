json.array! @messages do |message|
  json.image message.image.url
  json.content message.content
  json.user_name message.user.name
  json.created_at message.created_at.strftime("%Y/%m/%d %H:%M")
  json.id message.id
end
