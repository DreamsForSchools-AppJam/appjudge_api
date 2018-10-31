# The main Judge class
class Judge:

    def __init__(self, name = "", username = "", job_title = "AppJam+ Judge"):
        self.name = name
        self.username = username
        self.password = ""
        self.job_title = job_title
        self.id = 0
        self.event_id = 0

    def set_info(self, name = "John", username = "", job_title = "AppJam+ Judge"):
        self.name = name
        self.username = username
        self.job_title = job_title

    def get_info(self, name = "John", username = "", job_title = "AppJam+ Judge"):
        self.name = name
        self.username = username
        self.job_title = job_title