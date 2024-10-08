import { Avatar, Box, Tooltip } from "@chakra-ui/react";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const Scrollable = ({ messages }) => {
    const {user} = ChatState();

  return (
    <ScrollableFeed>
        {messages && messages.map((m, i) => 
            (<Box display={"flex"} key={m._id} >
                
                {(isSameSender(messages, m, i, user._id) || isLastMessage(messages, i, user._id)) && (
                    <Tooltip label={m.sender.name} placement="bottom-start" hasArrow >
                        <Avatar mt={"7px"} mr={1} size={"sm"} cursor={"pointer"} name={m.sender.name} src={m.sender.pic} />
                    </Tooltip>
                )}

            <span
                style={{
                    backgroundColor: `${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}`,
                    marginLeft: isSameSenderMargin(messages, m, i, user._id),
                    marginTop: isSameUser(messages, m, i, user._id) ? 7 : 10,
                    borderRadius: "20px",
                    padding: "5px 15px",
                    maxWidth: "75%",
                }}
            >
                {m.content}
            </span>

            </Box>)
        )}
    </ScrollableFeed>
  );
};

export default Scrollable;
