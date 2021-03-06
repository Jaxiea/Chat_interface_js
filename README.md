Doodle Chat Interface Challenge. December 2020. Jada Xie.

Tools:

I used vanilla JS/HTML/CSS for the challenge. I attempted to learn React.js for the challenge, but was overwhelmed after an afternoon of trying. I chose vanilla JS since it was familiar. (P5.js which I'm more familiar with wouldn't have presented a significant advantage in anyway. )

Some of the functions used were first times for me, for instance interacting with an API, I thought it would be more clear to lay them out for my learning and readability instead of chaining them a lot. But I do hope I get better at chaining.


PRIORITIES:

Top Priorities:
1. Implement core message features, sending, fetching, correctly.

2. Displaying messages in readable form, parsing timestamp, getting rid of common html encoding issues.

3. Prompt for username, to enable actually sending in messages.

4. Basic styling for readability, separating font size and color for "author" and "time"; Displaying messages in "sequential" blocks for intuitive/commonplace display.

Later Priorities:

1. Styling the message input box, its border and the submit button so that everything is in unison, like the example images in /assets. And spending time to perfect all margins and padding in general. (The decision on which values are absolute which in percentage are a little bit arbitrary in places at this point.) Also put more work on the colors.

2. Optimizing the code. See below "What I would do...", No.1. (Although, hopefully with experience I wouldn't have to take this detour.)

3. A more vigorous output check for HTMLencode, what I have now only covers the basics.

4. An input check for username input (?)

5. Deal with visitors clicking the cancel button on the first username prompt.




What I would do if I had more time:

1. Implementing a more efficient way of updating the message list, by using the fetch message by timestamp feature. Instead of retrieving and comparing the entire list, this is impossible to run after a while.

2. Implement a fetch feature for if users want to check messages BEFORE a certain timestamp.

3. Focus view after sending messages, so that the view updates to the latest message sent, or retrieved.

4. Implement an automatic message retriever based on perhaps time. (Every few senconds?) (Combined with step 1.)

5. Learn how to implement this in react. 

6. Implement more error checking and catching.



I'm sure I'll think of more items for the lists the second I hit send on the email, but at the moment, this is what I have. Thanks for reading all of this!
