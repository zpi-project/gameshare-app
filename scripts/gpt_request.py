import openai
import time as t


def get_short_description(description):
    openai.api_key_path = 'scripts/path_api_key'

    question = "Shorten this game description to 3-4 sentences removing all html markups (<br> etc.)\n\n"

    start = t.time_ns()

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", 
             "content": question + description
            }
        ]
    )

    stop = t.time_ns()

    print((stop-start)/10**6)

    return response['choices'][0]['message']['content']

