<?php
/**
 * Created by IntelliJ IDEA.
 * User: kevin
 * Date: 6/30/18
 * Time: 9:28 AM
 */

namespace trka\Marketplace\Classes;

require_once __DIR__ . '/../vendor/autoload.php';

use Carbon\Carbon;
use GuzzleHttp\Client;

class GhRepoClient
{
    protected $client;
    public $repository;
    public $releases;
    public $repoPath;

    /** @var  array */
    private $releasesArray;

    /**
     * GhRepoClient constructor.
     * @param $repoPath repository path within the GitHub API.
     *  example: "mautic/mautic"
     */
    public function __construct($repoPath)
    {
        $this->getClient();
        $this->repoPath = $repoPath;
        $this->loadRepo($repoPath);
    }

    protected function getClient()
    {
        if (null === $this->client) {
            // @todo: *SECRETS* 1) move these to app config. 2) before making repo public, remove these api keys and reset in github app control
            $this->client = new Client([
                'base_uri' => 'https://api.github.com',
                'headers' => [
                    'Accept' => 'application/vnd.github.v3+json'
                ],
                'query' => [
                    'client_id' => 'e67e4c083f8dcc1b5e0a',
                    'client_secret' => 'b892ad60bd417e4689aa43f2f2518b0f71aee528',
                ]
            ]);
        }

        return $this->client;
    }

    protected function loadRepo($repoPath)
    {
        try{
            $repositoryResponse = $this->client->request("GET", "/repos/$repoPath");
            $this->repository = \GuzzleHttp\json_decode($repositoryResponse->getBody());
            $releasesResponse = $this->client->request("GET", "/repos/$repoPath/releases");
            $this->releases = \GuzzleHttp\json_decode($releasesResponse->getBody());
            $this->releasesArray = \GuzzleHttp\json_decode($releasesResponse->getBody(), true);
        }catch (\Exception $exception){
        }
    }

    //------------- repo accessors. @todo: abstract these into a std interface for multiple git api clients
    public function id()
    {
        return $this->repository->id;
    }

    public function name()
    {
        return $this->repository->name;
    }

    public function fullName()
    {
        return $this->repository->full_name;
    }

    public function shortDescription()
    {
        return $this->repository->description;
    }

    /**
     * @return string
     */
    public function repoUrl()
    {
        return $this->repository->html_url;
    }

    public function projectHomeUrl()
    {
        return $this->repository->homepage;
    }

    public function stats()
    {
        return [
            'forks' => $this->repository->forks,
            'open_issues' => $this->repository->open_issues,
            'watchers' => $this->repository->watchers,
        ];
    }



    public function issuesPage(){
        return "https://github.com/$this->repoPath/issues";
    }

    //------------- repo releases

    /**
     * @return int number of repo releases
     */
    public function releasesCount()
    {
        return count($this->releases);
    }

    /**
     * @return number
     */
    public function downloadsCount()
    {
        $assets = array_column($this->releasesArray, 'assets');
        $needle = 'download_count';
        $downloads= [];
        array_walk_recursive($assets, function($value, $key) use (&$downloads, $needle) {
            if ($key == $needle)
                $downloads[] = $value;
        });
        return array_sum($downloads);
    }

    /**
     * @return array all releases, parsed and normalized
     */
    public function allReleases()
    {
        $ret = [];
        foreach ($this->releases as $release) {
            $ret[] = $this->parseRelease($release);
        }
        return $ret;
    }

    /**
     * @return array most recent release version, parsed and normalized
     */
    public function latestRelease()
    {
        return $this->parseRelease($this->releases[0]);
    }

    //------------- repo owner info // @todo: use the new parseUser instead
    public function owner()
    {
        return $this->parseUser($this->repository->owner);
    }

    public function ownerName()
    {
        return $this->repository->owner->login;
    }

    public function ownerUri($type = "html")
    {
        $url = "";
        switch ($type) {
            case 'api':
                $url = $this->repository->owner->url;
                break;
            default:
                $url = $this->repository->owner->html_url;
        }

        return $url;
    }

    //------------- license info
    public function license()
    {
        return [
            'name' => $this->repository->license->name,
            'key' => $this->repository->license->key,
        ];
    }

    public function parseReadme()
    {
        $response = $this->client->request("GET", '/repos/'.$this->repoPath.'/contents/README.md');
        $readme = \GuzzleHttp\json_decode($response->getBody(), true);
        return base64_decode($readme['content']);
    }


    //------------- Internal parse handlers.

    /**
     * Parse a given GitHub release version into normalized ob
     * @param $release
     * @return array
     */
    protected function parseRelease($release)
    {
        $ret = [
            "name" => $release->name,
            "tag" => $release->tag_name,
            "uri" => $release->html_url,
            "content_md" => $release->body,
            "author" => $this->parseUser($release->author),
            "published" => Carbon::parse($release->published_at),
            "source" => [
                "tar" => $release->tarball_url,
                "zip" => $release->zipball_url,
            ]
        ];

        if (count($release->assets)) {
            $ret['assets'] = [];
            foreach ($release->assets as $asset) {
                $ret['assets'][] = $this->parseReleaseAsset($asset);
            }
        }

        return $ret;
    }

    protected function parseReleaseAsset($asset)
    {
        $parsedAsset = [
            'url' => $asset->url,
            'name' => $asset->name,
            'label' => $asset->label,
            'type' => $asset->content_type,
            'size' => $asset->size,
            'uploader' => $this->parseUser($asset->uploader),
            'updated' => Carbon::parse($asset->updated_at),
            'downloadUri' => $asset->browser_download_url,
        ];

        return $parsedAsset;
    }

    protected function parseUser($userNode)
    {
        $parsedUser = [
            'username' => $userNode->login,
            'avatar' => $userNode->avatar_url,
            'profileUri' => $userNode->html_url,
        ];

        return $parsedUser;
    }

}