Doodle Chat Interface Challenge. December 2020.

PRIORITIES:

Top priorities:
1. Implement core message features, sending, fetching, correctly.
2. Displaying messages in readable form, parsing timestamp, getting rid of common html encoding issues.
3. Prompt for username, to enable actually sending in messages.
4. Basic styling for readability, separating font size and color for "author" and "time"; Displaying messages in "sequential" blocks for intuitive/commonplace display.

Later priorities:
1. Styling the message input box, its border and the submit button so that everything is in unison, like the example images in /assets. And spending time to perfect all margins and padding in general.
2. Optimizing the code. See What I would do..., No.1. (Although, hopefully with experience I wouldn't have to take this detour.)
3. A more vigorous output check for HTMLencode, what I have now only covers the basics.
4. A input check for username input (?)
5. Deal with visitors clicking the cancel button on the first username prompt.



What I would do if I had more time:
1. Implementing a more efficient way of updating the message list, by using the fetch message by timestamp feature. Instead of retrieving and comparing the entire list, this is impossible to run after a while.
2. Implement a fetch feature for if users want to check messages BEFORE a certain timestamp.
3. Focus view after sending messages, so that the view updates to the latest message sent, or retrieved.
4. Implement an automatic message retriever based on perhaps time. (Every few senconds?) (Combined with step 1.)
5. Learn how to implement this in react. I tried this at first but didn't manage due to complete lack of experience, but I see the benefits of using react here over vanilla JS.
6. Implement more error checking and catching.



I'm sure I'll think of more items for the lists the second I hit send on the email, but at the moment, this is what I have. Thanks for reading all of this!
