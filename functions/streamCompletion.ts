import api from "@/pages/api";

export const streamCompletion = async (
    model: string, 
    temperature: string, 
    systemPrompt: string, 
    prompt: string,
    onFinish: any,
    setText: any,
    beforeCheck: any,
    setGeneratingStarted: any,
    setAbortController: any,
    setLoading: any,
    loading: boolean,
    setOpenNoElixirModal: any,
    transactionTitle: string,
    abortController: any
) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    const workspace = localStorage.getItem("workspace");
    const newAbortController = new AbortController();
    setAbortController(newAbortController);
    setLoading(true);
    let fetchedUser = null;
    if (workspace && workspace !== "null" && workspace !== "undefined") {
      const {data} = await api.get(`/workspace-company/${workspace}`, {
        headers: {
          authorization: token
        }
      });
      fetchedUser = data.company;
    } else {
      const {data} = await api.get(`/users/${userId}`, {
        headers: {
          authorization: token
        }
      });
      fetchedUser = data;
    }
    //make sure user has elixir
    if(fetchedUser.tokenBalance <= 0) {
      setOpenNoElixirModal(true);
      return;
    }

    let reply = "";

    try {
        const response = await fetch('https://asystentai.herokuapp.com/askAI', {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
          signal: newAbortController.signal,
          body: JSON.stringify({prompt, title: transactionTitle, model, systemPrompt, temperature}),
        });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if(response.body){
        const reader = response.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            setLoading(false);
            setText(reply)
            break;
          }
  
          const jsonStrings = new TextDecoder().decode(value).split('data: ').filter((str) => str.trim() !== '');
          setGeneratingStarted(false);
          for (const jsonString of jsonStrings) {
            try {
              const data = JSON.parse(jsonString);
              if (data.content) {
                reply += data.content;
                setText(reply);
              }
            } catch (error) {
              console.error('Error parsing JSON:', jsonString, error);
            }
          }
        }
      }

    } catch (e: any) {
      if (e.message === "Fetch is aborted") {
        setLoading(false);
      } else {
        console.log(e);
        setLoading(false);
      }
    } finally {
      abortController.abort();
    }
}