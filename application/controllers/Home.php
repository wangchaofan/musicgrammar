<?php
class Home extends MY_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('group_model');
        $this->load->model('user_model');
        $this->load->helper('url');
        $this->load->library('session');
    }

    public function index()
    {
        $groups = $this->group_model->group_list();
        $data['groups'] = $groups;
        $this->load->view('home/index', $data);
    }

    public function select()
    {
        $user_id = $_SESSION['user_id'];
        if (empty($user_id)) {
            redirect("/");
        }
        $user_info = $this->user_model->get($user_id);
        $data['user_name'] = $user_info['name'];
        $data['group_id'] = $user_info['group_id'];
        $data['status'] = $user_info['status'];

        $group_info = $this->group_model->get_group($user_info['group_id']);
        $data['group_alias'] = $group_info['alias'];
        $data['group_name'] = $group_info['name'];

        $_SESSION['group_id'] = $data['group_id'];
        $_SESSION['group_name'] = $data['group_name'];

        $this->load->view('home/select', $data);
    }

    public function exercise()
    {
        $data['user_name'] = empty($_SESSION['user_name']) ? "" : $_SESSION['user_name'];
        $data['group_name'] = empty($_SESSION['group_name']) ? "" : $_SESSION['group_name'];
        $data['group_alias'] =  empty($_SESSION['group_alias']) ? "" : $_SESSION['group_alias'];

        if (empty($data['user_name']) || empty($data['group_name']) || empty($data['group_alias'])) {
            redirect("/");
        }
        $this->load->view('home/exercise', $data);
    }


    // 开始练习
    public function begin_exercise()
    {
        $data['user_name'] = empty($_SESSION['user_name']) ? "" : $_SESSION['user_name'];
        $data['group_name'] = empty($_SESSION['group_name']) ? "" : $_SESSION['group_name'];
        $data['group_alias'] =  empty($_SESSION['group_alias']) ? "" : $_SESSION['group_alias'];
        $data['group_id'] =  empty($_SESSION['group_id']) ? "" : $_SESSION['group_id'];

        if (empty($data['user_name']) || empty($data['group_name']) || empty($data['group_alias'])) {
            redirect("/");
        }

        $users = $this->user_model->group_users($data['group_id']);

        if (count($users) < 5) {
            $this->error(1, "人数未满", array('users' => $users));
        }

        $this->load->view('home/begin_exercise', $data);
    }


}